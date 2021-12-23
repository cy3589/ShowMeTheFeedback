import { stateObject as prevStateObject } from "./staetObject.js";
import { editProjectForm, getMemberElement } from "./editProjectForm.js";
import { addMember } from "./addMember.js";
import { setIcon, setIconTeamDiscribe } from "./setIcon.js";
import { onChangeUpload } from "./onChangeUpload.js";
import { getTokenFromCookies } from "../auth/token.js";
import { id as projectId } from "./index.js";

export let newStateObject;
// export let newStateObject = JSON.parse(JSON.stringify(prevStateObject));
const FETCH_URL_UPDATE_PORT =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/api/projects";
const showProjectElementsWrapper = document.querySelector(".show-project");
const editProjectElementsWrapper = document.querySelector(".edit-project");

document.querySelector(".상태확인버튼").addEventListener("click", () => {
  console.log("prevStateObject: ", prevStateObject);
  console.log("newStateObject: ", newStateObject);
  // console.log(document.querySelector(".upload-button-hidden").files);
  // document.querySelector(".upload-button-hidden").click();
});
document.querySelector(".수정하기버튼").addEventListener("click", (e) => {
  newStateObject = JSON.parse(JSON.stringify(prevStateObject));
  newStateObject.additionalThumbnails = []; // 추가 file
  newStateObject.currentThumbnails = [...newStateObject.gotThumbnails]; // url들
  newStateObject.previewThumbnails = [...newStateObject.gotThumbnails];
  delete newStateObject.gotThumbnails;
  showProjectElementsWrapper.classList.add("invisible");
  editProjectElementsWrapper.innerHTML = editProjectForm;
  prevStateObject.member.forEach((member) => {
    document.querySelector(".members").innerHTML += getMemberElement(member);
  });
  const {
    inputTeamNameElement,
    inputProjectNameElement,
    inputMainFuncElement,
    inputSkillsElement,
    inputMemberElements,
    addMemberElement,
  } = getInputElementsFromEditForm();
  inputTeamNameElement.value = prevStateObject.teamName;
  inputProjectNameElement.value = prevStateObject.projectName;
  inputMainFuncElement.value = prevStateObject.mainFunc;
  inputSkillsElement.value = prevStateObject.skills;

  addEventListenerInput(inputTeamNameElement, "teamName", "team-name");
  addEventListenerInput(inputProjectNameElement, "projectName", "project-name");
  addEventListenerInput(inputMainFuncElement, "mainFunc", "main-func");
  addEventListenerInput(inputSkillsElement, "skills", "skills");
  addMemberElement.addEventListener("click", addMember);
  inputMemberElements.forEach((memberElement, i) => {
    const memberNameElement = memberElement.querySelector(".member-name");
    const memberJobElement = memberElement.querySelector(".member-job");
    const memberTaskElement = memberElement.querySelector(".member-task");
    const index = i;
    memberNameElement.addEventListener("input", (e) => {
      newStateObject.member[index].name = e.target.value;
      setIconTeamDiscribe();
    });
    memberJobElement.addEventListener("input", (e) => {
      newStateObject.member[index].job = e.target.value;
      setIconTeamDiscribe();
    });
    memberTaskElement.addEventListener("input", (e) => {
      newStateObject.member[index].task = e.target.value;
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
      console.log(index);
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      newStateObject.member.splice(index, 1);
      setIconTeamDiscribe();
    });
    if (i !== 0) memberElement.appendChild(deleteButton);
  });
  console.log(newStateObject);

  setIcon(newStateObject["teamName"], "team-name");
  setIcon(newStateObject["projectName"], "project-name");
  setIcon(newStateObject["mainFunc"], "main-func");
  setIcon(newStateObject["skills"], "skills");
  setIconTeamDiscribe();

  const btnClick = () => {
    if (
      newStateObject.currentThumbnails.length +
        newStateObject.additionalThumbnails.length >
      2
    ) {
      alert("사진은 최대 3개까지만 가능합니다");
      return;
    }
    document.querySelector(".upload-button-hidden").click();
  };

  const targetElement = document.querySelector(".image-preview");
  targetElement.innerHTML = "";
  newStateObject.currentThumbnails.forEach((v, i) => {
    targetElement.innerHTML += /* html */ `
      <div>
        <img src=${v} alt="${v}" class="thumbnail-image current-image" />
        <input type="button" class="thumbnail-delete" value="삭제하기" />
      </div>
      `;
    document
      .querySelector(".upload-button-hidden")
      .addEventListener("change", onChangeUpload);
  });
  newStateObject.additionalThumbnails.forEach((v, i) => {
    targetElement.innerHTML += /* html */ `
      <div>
        <img src=${v} alt="${v}" class="thumbnail-image" />
        <input type="button" class="thumbnail-delete" value="삭제하기" />
      </div>
      `;
    document
      .querySelector(".upload-button-hidden")
      .addEventListener("change", onChangeUpload);
  });
  document.querySelector(".upload-button").addEventListener("click", btnClick);

  document.querySelectorAll(".thumbnail-delete").forEach((v) =>
    v.addEventListener("click", (e) => {
      const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
        e.target.parentNode
      );
      console.log("@@@@@@");
      // console.log(Array.from(document.querySelectorAll(".additional-image")));
      console.log(
        Array.from(document.querySelectorAll(".current-image")).indexOf(
          e.target.parentNode.children[0]
        )
      );
      console.log("@@@@@@");
      const additionalImageIndex = Array.from(
        document.querySelectorAll(".additional-image")
      ).indexOf(e.target.parentNode.children[0]);
      const currentImageIndex = Array.from(
        document.querySelectorAll(".current-image")
      ).indexOf(e.target.parentNode.children[0]);
      // console.log(e.target.parentNode.parentNode);
      console.log(e.target.parentNode.children[0]);
      console.log("additionalImageIndex: ", additionalImageIndex);
      console.log("currentImageIndex: ", currentImageIndex);
      if (additionalImageIndex !== -1) {
        newStateObject.additionalThumbnails.splice(additionalImageIndex, 1);
      }
      if (currentImageIndex !== -1) {
        newStateObject.currentThumbnails.splice(currentImageIndex, 1);
      }
      newStateObject.previewThumbnails.splice(index, 1);
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    })
  );

  document
    .querySelector(".create-project-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      if (document.querySelector(".check-false")) {
        alert("모든 항목을 채워주세요!");
      }
      const formData = new FormData();
      const {
        teamName,
        projectName,
        mainFunc,
        skills,
        member,
        currentThumbnails,
        additionalThumbnails,
      } = newStateObject;
      formData.append("teamName", teamName);
      formData.append("projectName", projectName);
      formData.append("mainFunc", mainFunc);
      formData.append("skills", skills);
      formData.append("currentThumbnails", currentThumbnails);
      formData.append("member", JSON.stringify(member));
      for (let i = 0; i < additionalThumbnails.length; i++) {
        formData.append("additionalThumbnails", additionalThumbnails[i]);
      }
      const options = {
        method: "PUT",
        headers: {
          access: getTokenFromCookies(accessToken),
        },
        body: formData,
      };
      fetch(`${FETCH_URL_UPDATE_PORT}/${projectId}`, options)
        .then((result) => result.json())
        .then((result) => {
          if (result.error) console.log(result.error);
          if (result.message) console.log(result.message);
          // 성공 시 동작 작성 필요
        });
    });
});
const addEventListenerInput = (element, targetStateName, elementId) => {
  element.addEventListener("input", (e) => {
    newStateObject[targetStateName] = e.target.value;
    setIcon(newStateObject[targetStateName], elementId);
  });
};
document.querySelector(".수정취소하기버튼").addEventListener("click", (e) => {
  // if (confirm("지금 취소하면 수정하신 내역이 모두 사라집니다!")) {
  showProjectElementsWrapper.classList.remove("invisible");
  newStateObject = JSON.parse(JSON.stringify(prevStateObject));
  editProjectElementsWrapper.innerHTML = "";
  return;
  // }
});

const getInputElementsFromEditForm = () => {
  const inputTeamNameElement = document
    .querySelector(".team-name")
    .querySelector(".team-name");
  const inputProjectNameElement = document
    .querySelector(".project-name")
    .querySelector(".project-name");
  const inputMainFuncElement = document
    .querySelector(".main-func")
    .querySelector(".main-func");
  const inputSkillsElement = document
    .querySelector(".skills")
    .querySelector(".skills");
  const inputMemberElements = document.querySelectorAll(".member");
  const addMemberElement = document.querySelector(".add-member");

  return {
    inputTeamNameElement,
    inputProjectNameElement,
    inputMainFuncElement,
    inputSkillsElement,
    inputMemberElements,
    addMemberElement,
  };
};

//임의기능버튼
document.querySelector(".임의기능버튼").addEventListener("click", (e) => {
  console.log(window.location.pathname);
});
//
