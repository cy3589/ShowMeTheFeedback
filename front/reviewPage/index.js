import { stateObject, setStateObject } from "./staetObject.js";
const pathArr = window.location.pathname.split("/");
export const id = pathArr[pathArr.length - 1];
import { getTokenFromCookies } from "../auth/token.js";
const BACKEND_BASE_URL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";
const now = new Date();

//작성자 관련
function mainArea() {
  fetch(`${BACKEND_BASE_URL}/api/projects/${id}`, {
    method: "GET",
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setStateObject(JSON.parse(JSON.stringify(data)));
      stateProjectSave(data);
      mainContentInfo(data);
      mainContentImage(data.thumbnails);
      mainContentStar(data.averageRating);
    });
}

// 댓글 조회 관련
function commentArea() {
  fetch(`${BACKEND_BASE_URL}/api/comments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      access: getTokenFromCookies("accessToken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      mainContentEval(data.comments);
      commentList(data.comments);
      commentCreate();
    });
}

//댓글 작성 관련

//상태 저장

let stateProject = [];

function stateProjectSave(data) {
  for (let i = 0; i < data.length; i++) {
    stateProject.push(data[i]);
  }
}

//날짜 출력하기
const getProjectDateFormat = (dateObject) => {
  let Year = dateObject.getFullYear();
  let Month = dateObject.getMonth() + 1;
  let Date = dateObject.getDate();
  let result = Year + "." + Month + "." + Date;
  return result;
};

const getAgoStringComment = (dateObject) => {
  const dateDiff = now - dateObject;
  let AgoMinute = Math.round(dateDiff / (1000 * 60));
  if (AgoMinute === 0) return `방금 전`;
  if (AgoMinute < 60) return `${AgoMinute}분 전`;
  let AgoTime = parseInt(AgoMinute / 60, 10);
  AgoMinute -= AgoTime * 60;
  if (AgoTime < 24) return `${Math.round(AgoTime + AgoMinute / 60)}시간 전`;

  console.log();
  console.log(now);
  console.log(dateObject);
  let Year = dateObject.getFullYear();
  let Month = dateObject.getMonth() + 1;
  let Date = dateObject.getDate();
  let result = Year + "." + Month + "." + Date;
  //  +
  // " " +
  // Hour +
  // ":" +
  // Minutes +
  // ":" +
  // Seconds;
  return result;
};

//이미지 및 버튼 이벤트
function mainContentImage(data) {
  console.log(data);
  let main_img = document.getElementsByClassName("main_img")[0];
  let prev_img_btn = document.getElementsByClassName("prev_img_btn")[0];
  let next_img_btn = document.getElementsByClassName("next_img_btn")[0];
  main_img.src = data[0];

  prev_img_btn.disabled = true;

  if (data.length > 1) {
    next_img_btn.disabled = false;
  } else {
    next_img_btn.disabled = true;
  }

  let main_img_index = 0;

  prev_img_btn.addEventListener("click", () => {
    if (main_img_index > 0) {
      main_img_index--;
      main_img.src = data[main_img_index];
      next_img_btn.disabled = false;
      if (main_img_index === 0) {
        prev_img_btn.disabled = true;
      }
    }
  });

  next_img_btn.addEventListener("click", () => {
    if (main_img_index < data.length - 1) {
      main_img_index++;
      main_img.src = data[main_img_index];
      prev_img_btn.disabled = false;
      if (main_img_index === data.length - 1) {
        next_img_btn.disabled = true;
      }
    }
  });
}

//상세 페이지 작성자, 제목, 날짜
function mainContentInfo(data) {
  let projectTitle = document.getElementsByClassName("project-Title")[0];
  let projectTeamName = document.getElementsByClassName("project-Author")[0];
  let projectDate = document.getElementsByClassName("project-Date")[0];
  let projectMainFunc = document.getElementsByClassName(
    "project-Container_mainFunc"
  )[0];
  let projectSkills = document.getElementsByClassName(
    "project-Container_skills"
  )[0];
  let projectMembersAndJobs = document.getElementsByClassName(
    "project-Container_MembersAndJobs"
  )[0];

  projectTitle.innerText = data.projectName;
  projectTeamName.innerText = data.teamName;
  projectDate.innerText = getProjectDateFormat(new Date(data.createdAt));
  projectMainFunc.innerText = data.mainFunc;
  projectSkills.innerHTML = data.skills;
  for (let i = 0; i < data.members.length; i++) {
    projectMembersAndJobs.innerHTML += `<div class = "project-Container_MembersAndJobs_list${i}">${data.members[i].name}(${data.members[i].job}) : ${data.members[i].task}</div>`;
  }
}

//상세 페이지 본문 별점
function mainContentStar(avg) {
  let scoreStarMask = document.getElementsByClassName("scoreStarMask")[0];

  scoreStarMask.style.width = `${Number(avg) * 20}%`;
}

//상세 페이지 본문 평가한 사람의 수
function mainContentEval(data) {
  let mainContentEval = document.getElementsByClassName("mainContentEval")[0];
  mainContentEval.innerText = data.length + "명";
}

//댓글 목록
function commentList(data) {
  let node_list = [];
  for (let i = 0; i < data.length; i++) {
    let commentTemplate = document.getElementsByClassName("commentTemplate")[0];
    console.log("1341241324132441243124312413r1424312r1234r2rd123r32");
    let node = document.importNode(commentTemplate.content, true);

    node.querySelector(".commentAuthor").innerText = data[i].author;
    node.querySelector(".commentDate").innerText = getAgoStringComment(
      new Date(data[i].createdAt)
    );
    node.querySelector(".commentContent").style.width = "400px";
    node.querySelector(".commentContent").style.height = "100px";
    node.querySelector(".commentContent").innerText = data[i].content;

    node_list.push(node.querySelector(".commentContent"));
    if (data[i].content.length <= 100) {
      node.querySelector(".commentMoreContent").style.display = "none";
    } else {
      node.querySelector(".commentContent").style.overflow = "hidden";
      node
        .querySelector(".commentMoreContent")
        .addEventListener("click", (e) => {
          e.preventDefault();
          if (e.target.innerText === "전체 내용 보기") {
            node_list[i].style.height = "auto";
            e.target.innerText = "간략히 보기";
          } else {
            node_list[i].style.height = "100px";
            e.target.innerText = "전체 내용 보기";
          }
        });
    }

    node.querySelector(".commentStar").style.position = "relative";
    node.querySelector(".commentStar").style.fontSize = "1rem";
    node.querySelector(".commentStar").style.color = "#ddd";

    node.querySelector(".commentStarMask").style.position = "absolute";
    node.querySelector(".commentStarMask").style.width = `${
      data[i].rating * 20
    }%`;
    node.querySelector(".commentStarMask").style.left = "0";
    node.querySelector(".commentStarMask").style.color = "red";
    node.querySelector(".commentStarMask").style.overflow = "hidden";

    document.getElementsByClassName("commentsList")[0].appendChild(node);
  }
}

//댓글 등록

function commentCreate() {
  let commentRegStarDrag =
    document.getElementsByClassName("commentRegStarDrag")[0];
  let commentRegBtn = document.getElementsByClassName("commentRegBtn")[0];
  commentRegStarDrag.addEventListener("input", (e) => {
    let commentRegStarMask =
      document.getElementsByClassName("commentRegStarMask")[0];
    commentRegStarMask.style.width = `${e.target.value * 10}%`;
  });

  commentRegBtn.addEventListener("click", async (e) => {
    const content = e.target.parentElement.parentElement.querySelector(
      ".writeCommentContent"
    ).value;
    if (!content) {
      return alert("댓글을 입력해주세요");
    }
    const rating =
      parseInt(
        e.target.parentElement.querySelector(".commentRegStarDrag").value,
        10
      ) / 2;
    console.log("작성한댓글은 : ", content);
    console.log("별점은 : ", rating, "점 입니다");
    console.log("게시글의 id는 :", id);
    const postCommentOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access: getTokenFromCookies("accessToken"),
      },
      body: JSON.stringify({
        content,
        rating,
      }),
    };
    await fetch(
      `http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/api/comments/${id}`,
      postCommentOptions
    )
      .then((result) => result.json())
      .then((res) => {
        location.reload();
      });

    // await fetch("http://localhost:8080/commentPost", options)
    //   .then((result) => result.json())
    //   .then(console.log);

    // let comment = {
    //   postId: 1,
    //   id: 1,
    //   name: "김용규",
    //   email: "Eliseo@gardner.biz",
    //   rating: document.getElementsByClassName("commentRegStarDrag")[0].value,
    //   commentDate: dateFormat(new Date()),
    //   body: document.getElementsByClassName("writeCommentContent")[0].value,
    // };
    // stateComment.push(comment);

    // fetch("http://localhost:9999/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(stateComment),
    // })
    //   .then((res) => {
    //     if (res.status === 200 || res.status === 201) {
    //       res.json().then((json) => console.log(json));
    //     } else {
    //       console.error(res.statusText);
    //     }
    //   })
    //   .catch((err) => console.error(err));
    // commentList(stateComment);
  });
}

document
  .querySelector(".project-Delete-Button")
  .addEventListener("click", (e) => {
    if (confirm("삭제하시겠습니까?")) {
      fetch(`${BACKEND_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          access: getTokenFromCookies("accessToken"),
        },
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.message) {
            alert(result.message);
            window.location.href = "/Projects";
          } else {
            alert(result.error);
          }
        });
    }
  });

mainArea();
// imageArea();
commentArea();
