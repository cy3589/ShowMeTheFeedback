const stateObject = {
  teamName: "",
  projectName: "",
  mainFunc: "",
  skills: "",
  member: "",
  teamDiscribe: "",
  thumbnails: [], // 미리보기 구현을 위한 state
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
  // thumbnails.forEach((f) => {
  //   formData.append("thumnails", f);
  // });

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
  const nowValue = document.getElementById(elementId).value;
  stateObject[stateName] = nowValue;
  return stateObject[stateName];
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

// onChangeTeamDiscribe();
onChangeTeamName();
onChangeProjectName();
onChangeMainFunc();
onChangeSkills();

const btnClick = () => {
  if (stateObject.thumbnails.length > 2) {
    alert("사진은 최대 3개까지만 가능합니다");
    return;
  }
  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.click();
};
const onChangeUpload = async () => {
  console.log("onChangeUpload");
  const uploadBtn = document.getElementById("uploadBtn");
  let filesLength = uploadBtn.files.length;
  if (filesLength > 3) {
    alert("사진은 최대 3개까지만 가능합니다");
    filesLength = 3;
  }

  const targetElement = document.getElementById("temptemp");
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
      <img src=${v} alt="${v}" class="thumbnail-image" style="width:100px;height:100px;" />;
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
const deleteButton = (e) => {
  console.log(e);
};

const onclickBtnTemp = () => {
  console.log(stateObject.thumbnails.length);
  console.log(stateObject.postThumbnailsData.length);
  // console.log(document.querySelectorAll(".thumbnail-delete")[0].classList[1]);
};
