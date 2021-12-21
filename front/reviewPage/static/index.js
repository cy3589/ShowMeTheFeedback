//작성자 관련
function mainArea() {
  fetch("./author.json")
    .then((res) => res.json())
    .then((data) => {
      mainContentInfo(data);
    });
}

//상세페이지 이미지 관련
function imageArea() {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((res) => res.json())
    .then((data) => {
      mainContentImage(data);
    });
}

// 댓글 조회 관련
function commentArea() {
  fetch("./comment.json")
    .then((res) => res.json())
    .then((data) => {
      commentList(data);
      mainContentStar(data);
      mainContentEval(data);
      commentCreate(data);
    });
}

//댓글 작성 관련
const getAuthor = async () => {
  const res = await fetch("./author.json");
  const user = await res.json();
  return user.user;
};

function commentAreaCreate() {
  fetch("./comment.json", {
    method: "post",
    body: JSON.stringify({
      name: "yeri",
      batch: 1,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert("저장 완료");
      }
    });
}

//날짜 출력하기
function dateFormat(dateObject) {
  let Year = dateObject.getFullYear();
  let Month = dateObject.getMonth() + 1;
  let Date = dateObject.getDate();
  let Hour = dateObject.getHours();
  let Minutes = dateObject.getMinutes();
  let Seconds = dateObject.getSeconds();

  let result =
    Year +
    "." +
    Month +
    "." +
    Date +
    " " +
    Hour +
    ":" +
    Minutes +
    ":" +
    Seconds;

  return result;
}

//이미지 및 버튼 이벤트
function mainContentImage(data) {
  let main_img = document.getElementsByClassName("main_img")[0];
  let prev_img_btn = document.getElementsByClassName("prev_img_btn")[0];
  let next_img_btn = document.getElementsByClassName("next_img_btn")[0];
  main_img.src = data[0].url;

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
      main_img.src = data[main_img_index].url;
      next_img_btn.disabled = false;
      if (main_img_index === 0) {
        prev_img_btn.disabled = true;
      }
    }
  });

  next_img_btn.addEventListener("click", () => {
    if (main_img_index < data.length - 1) {
      main_img_index++;
      main_img.src = data[main_img_index].url;
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
  let projectAuthor = document.getElementsByClassName("project-Author")[0];
  let projectDate = document.getElementsByClassName("project-Date")[0];
  let projectContent = document.getElementsByClassName(
    "project-Content-div"
  )[0];

  projectTitle.innerText = data[0].title;
  projectAuthor.innerText = data[0].user;
  projectDate.innerText = data[0].uploadDate;
  projectContent.innerText = data[0].content;
}

//상세 페이지 본문 별점
function mainContentStar(data) {
  let scoreStarMask = document.getElementsByClassName("scoreStarMask")[0];
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum = sum + data[i].rating;
  }

  let avg = sum / data.length;

  scoreStarMask.style.width = `${avg * 10}%`;
}

//상세 페이지 본문 평가한 사람의 수
function mainContentEval(data) {
  let mainContentEval = document.getElementsByClassName("mainContentEval")[0];
  mainContentEval.innerText = data.length + "명";
}

//댓글 목록
function commentList(data) {
  for (let i = 0; i < data.length; i++) {
    let commentTemplate = document.getElementsByClassName("commentTemplate")[0];
    let node = document.importNode(commentTemplate.content, true);

    node.querySelector(".commentAuthor").innerText = data[i].name;
    node.querySelector(".commentDate").innerText = data[i].commentDate;
    node.querySelector(".commentContent").style.width = "400px";
    node.querySelector(".commentContent").style.height = "100px";
    node.querySelector(".commentContent").innerText = data[i].body;
    if (data[i].body.length <= 100) {
      node.querySelector(".commentMoreContent").style.display = "none";
    } else {
      node.querySelector(".commentContent").style.overflow = "hidden";
    }
    node.querySelector(".commentMoreContent").addEventListener("click", (e) => {
      e.preventDefault();
    });
    node.querySelector(".commentStar").style.position = "relative";
    node.querySelector(".commentStar").style.fontSize = "1rem";
    node.querySelector(".commentStar").style.color = "#ddd";

    node.querySelector(".commentStarMask").style.position = "absolute";
    node.querySelector(".commentStarMask").style.width = `${
      data[i].rating * 10
    }%`;
    node.querySelector(".commentStarMask").style.left = "0";
    node.querySelector(".commentStarMask").style.color = "red";
    node.querySelector(".commentStarMask").style.overflow = "hidden";

    document.getElementsByClassName("commentsList")[0].appendChild(node);
  }
}

//댓글 등록

function commentCreate(data) {
  // let commentBtn = document.getElementsByClassName("commentBtn")[0];

  // commentBtn.addEventListener("click", () => {
  //   let commentTemplate = document.getElementsByClassName("commentTemplate")[0];
  //   let node = document.importNode(commentTemplate.content, true);
  //   let writeCommentContent = document.getElementsByClassName(
  //     "writeCommentContent"
  //   )[0];

  // data.push({
  //   postId: 2356,
  //   id: 2356,
  //   name: "집게사장",
  //   email: "asdf@naver.com",
  //   starScore: 9,
  //   commentDate: dateFormat(new Date()),
  //   commentDate: writeCommentContent.value,
  // });

  //     commentList(data);

  // node.querySelector(".commentAuthor").innerText = User.nickName;
  // node.querySelector(".commentDate").innerText = User.commentDate;
  // if (writeCommentContent.value.length <= 100) {
  //   node.querySelector(".commentMoreContent").style.display = "none";
  //   node.querySelector(".commentContent").innerText =
  //     writeCommentContent.value;
  // } else {
  //   node.querySelector(".commentContent").innerText =
  //     writeCommentContent.value.slice(0, 100) + "...";
  // }
  // node.querySelector(".commentContent").innerText = writeCommentContent.value;
  // node.querySelector(".commentStar").innerText += "asdf";
  // document.getElementsByClassName("commentsList")[0].appendChild(node);
  // });

  let commentRegStarDrag =
    document.getElementsByClassName("commentRegStarDrag")[0];
  commentRegStarDrag.addEventListener("input", () => {
    let commentRegStarMask =
      document.getElementsByClassName("commentRegStarMask")[0];
    let x = document.getElementsByClassName("commentRegStarMask")[0];

    commentRegStarMask.style.width = `${x.value * 10}%`;
  });
}

mainArea();
imageArea();
commentArea();
