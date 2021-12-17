const stateObject = {
  teamName: "",
  projectName: "",
  mainFunc: "",
  skills: "",
  member: "",
  teamDiscribe: "",
  thumbnails: [], // Set데이터형은 중복을 허용하지 않음
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
    thumbnails,
  } = stateObject;
  formData.append("teamName", teamName);
  formData.append("projectName", projectName);
  formData.append("mainFunc", mainFunc);
  formData.append("skills", skills);
  formData.append("member", member);
  formData.append("teamDiscribe", teamDiscribe);
  thumbnails.forEach((f) => {
    formData.append("thumnails", f);
  });
  console.log(stateObject);
  console.log(formData.entries());
  fetch("http://localhost:8080/api/post/project", {
    method: "post",
    body: formData,
    // body: JSON.stringify({ aaa: "123123", bbb: "454545" }),

    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((result) => {
    console.log(result);
    if (result.success === "true") {
      window.location.href = `/project/${result.projectId}`;
    } else {
      alert("게시글 등록에 실패하였습니다. 다시 시도해주세요");
    }
  });
  return false;
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
  }
  targetElement.innerHTML = "";
  stateObject.thumbnails.forEach((v, i) => {
    targetElement.innerHTML += /* html */ `
    <div>
      <img src=${v} alt="${v}" class="thumbnail-image" style="width:100px;height:100px;" />;
      <input type="button" class="thumbnail-delete thumbnail-index-${i}" value="삭제하기" />
    </div>
    `;
  });
  document.querySelectorAll(".thumbnail-delete").forEach((v) =>
    v.addEventListener("click", (e) => {
      const parseLastClassString = e.target.classList[1];
      const index = parseInt(
        parseLastClassString[parseLastClassString.length - 1],
        10
      );
      stateObject.thumbnails.splice(index, 1);
      console.log(
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
      );
    })
  );
};
const deleteButton = (e) => {
  console.log(e);
};

const onclickBtnTemp = () => {
  console.log(stateObject.thumbnails.length);
  // console.log(document.querySelectorAll(".thumbnail-delete")[0].classList[1]);
};
