const stateObject = {
  teamName: "",
  projectName: "",
  mainFunc: "",
  skills: "",
  member: [{ name: "", job: "", task: "" }],
  teamDiscribe: "",
  thumbnails: [], // 미리보기 구현을 위한 state(post요청 시 포함하지 않음)
  postThumbnailsData: [], // post요청을 위한 state
};
const submitFunc = () => {
  const formData = new FormData();
  const {
    teamName,
    projectName,
    mainFunc,
    skills,
    member,
    teamDiscribe,
    postThumbnailsData,
  } = stateObject;
  formData.append("teamName", teamName);
  formData.append("projectName", projectName);
  formData.append("mainFunc", mainFunc);
  formData.append("skills", skills);
  formData.append("member", member);
  formData.append("teamDiscribe", teamDiscribe);
  for (let i = 0; i < postThumbnailsData.length; i++) {
    formData.append("thumbnails", postThumbnailsData[i]);
  }

  console.log(stateObject);
  console.log(formData.entries());
  const options = {
    method: "POST",
    body: formData,
  };
  fetch("http://localhost:8080/api/post/project", options).then((result) => {
    console.log(result);
    // if (result.success === "true") {
    //   window.location.href = `/project/${result.projectId}`;
    // } else {
    //   alert("게시글 등록에 실패하였습니다. 다시 시도해주세요");
    // }
  });
  // const option = {
  //   method: "post",
  //   body: JSON.stringify({ a: 123, b: 456 }),
  // };
  // fetch("http://localhost:8080/api/post/project", option);
  return false;
  // return true;
};
const onChangeFunc = (elementId, stateName) => {
  const nowValue = document.getElementsByName(elementId)[0].value;
  stateObject[stateName] = nowValue;
  return stateObject[stateName];
};

const setIconTeamDiscribe = () => {
  const checkElement = document
    .querySelector(".team-discribe")
    .querySelector(".check-icon");
  for (let i = 0; i < stateObject.member.length; i++) {
    if (
      !stateObject.member[i].name ||
      !stateObject.member[i].job ||
      !stateObject.member[i].task
    ) {
      checkElement.innerText = "!";
      checkElement.classList.remove("check-true");
      checkElement.classList.add("check-false");
      return;
    }
  }
  checkElement.innerText = "✓";
  checkElement.classList.remove("check-false");
  checkElement.classList.add("check-true");
  console.log("funcRun");
};

const setIcon = (state, className) => {
  if (!state) {
    const checkElement = document
      .querySelector("." + className)
      .querySelector(".check-icon");
    checkElement.innerText = "!";
    checkElement.classList.remove("check-true");
    checkElement.classList.add("check-false");
  } else {
    const checkElement = document
      .querySelector("." + className)
      .querySelector(".check-icon");
    checkElement.innerText = "✓";
    checkElement.classList.remove("check-false");
    checkElement.classList.add("check-true");
  }
};

const addMember = () => {
  stateObject.member.push({ name: "", job: "", task: "" });
  const memberLastIndex = stateObject.member.length - 1;
  const targetElement = document.querySelector(".members");

  const checkIconDiv = document.createElement("div");
  checkIconDiv.className = "check-icon";

  const wrapperDiv = document.createElement("div");
  wrapperDiv.style = "display:flex";
  wrapperDiv.className = "member";
  const inputMemberName = document.createElement("input");
  inputMemberName.type = "text";
  inputMemberName.placeholder = "이름";
  inputMemberName.name = "member-name";
  inputMemberName.addEventListener("input", (e) => {
    stateObject.member[memberLastIndex].name = e.target.value;
    setIconTeamDiscribe();
  });

  const inputMemberJob = document.createElement("input");
  inputMemberJob.type = "text";
  inputMemberJob.placeholder = "담당업무";
  inputMemberJob.name = "member-job";
  inputMemberJob.addEventListener("input", (e) => {
    stateObject.member[memberLastIndex].job = e.target.value;
    setIconTeamDiscribe();
  });

  const inputMemberTask = document.createElement("input");
  inputMemberTask.type = "text";
  inputMemberTask.placeholder = "업무내용";
  inputMemberTask.name = "member-task";
  inputMemberTask.addEventListener("input", (e) => {
    stateObject.member[memberLastIndex].task = e.target.value;
    setIconTeamDiscribe();
  });

  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.className = "delete-member";
  deleteButton.innerText = "-";
  deleteButton.addEventListener("click", (e) => {
    const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
      e.target.parentNode
    );
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    stateObject.member.splice(index, 1);
    setIconTeamDiscribe();
  });

  wrapperDiv.appendChild(checkIconDiv);
  wrapperDiv.appendChild(inputMemberName);
  wrapperDiv.appendChild(inputMemberJob);
  wrapperDiv.appendChild(inputMemberTask);
  wrapperDiv.appendChild(deleteButton);
  //innerHTML로 처리하면 form 입력 데이터가 초기화되서 element를 구현
  targetElement.appendChild(wrapperDiv);
  setIconTeamDiscribe();
};

const onChangeTeamName = () => {
  const elementId = "team-name"; // className도 동일하게 html에서 셋팅
  const stateId = "teamName";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};

const onChangeTeamDiscribe = () => {
  const elementId = "team-discribe";
  const stateId = "teamDiscribe";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};
const onChangeProjectName = () => {
  const elementId = "project-name";
  const stateId = "projectName";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};

const onChangeMainFunc = () => {
  const elementId = "main-func";
  const stateId = "mainFunc";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};
const onChangeSkills = () => {
  const elementId = "skills";
  const stateId = "skills";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};

const btnClick = () => {
  if (stateObject.thumbnails.length > 2) {
    alert("사진은 최대 3개까지만 가능합니다");
    return;
  }
  const uploadBtn = document.querySelector(".uploadBtn");
  uploadBtn.click();
};
const onChangeUpload = async () => {
  console.log("onChangeUpload");
  const uploadBtn = document.querySelector(".uploadBtn");
  let filesLength = uploadBtn.files.length;
  if (filesLength > 3) {
    alert("사진은 최대 3개까지만 가능합니다");
    filesLength = 3;
  }

  const targetElement = document.querySelector(".image-preview");
  const newPromise = async (file) => {
    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
      } catch (err) {
        reject(err);
      }
    });
  };
  for (let i = 0; i < filesLength; i++) {
    stateObject.thumbnails.push(await newPromise(uploadBtn.files[i]));
    stateObject.postThumbnailsData.push(uploadBtn.files[i]);
  }
  targetElement.innerHTML = "";
  stateObject.thumbnails.forEach((v, i) => {
    targetElement.innerHTML += /* html */ `
    <div>
      <img src=${v} alt="${v}" class="thumbnail-image" style="width:100px;height:100px;" />
      <input type="button" class="thumbnail-delete" value="삭제하기" />
    </div>
    `;
  });
  document.querySelectorAll(".thumbnail-delete").forEach((v) =>
    v.addEventListener("click", (e) => {
      const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
        e.target.parentNode
      );
      stateObject.thumbnails.splice(index, 1);
      stateObject.postThumbnailsData.splice(index, 1);
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    })
  );
  uploadBtn.value = "";
};
const initOnChangeMemberName = () => {
  stateObject.member[0].name =
    document.getElementsByName("member-name")[0].value;
  setIconTeamDiscribe();
};
const initOnChangeMemberJob = () => {
  stateObject.member[0].job = document.getElementsByName("member-job")[0].value;
  setIconTeamDiscribe();
};
const initOnChangeMemberTask = () => {
  stateObject.member[0].task =
    document.getElementsByName("member-task")[0].value;
  setIconTeamDiscribe();
};
// onChangeTeamDiscribe();
onChangeTeamName();
onChangeProjectName();
onChangeMainFunc();
onChangeSkills();
initOnChangeMemberName();
initOnChangeMemberJob();
initOnChangeMemberTask();
