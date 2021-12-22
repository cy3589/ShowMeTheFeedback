import { stateObject as prevStateObject } from "./staetObject.js";
import { editProjectForm, getMemberElement } from "./editProjectForm.js";
import { addMember } from "./addMember.js";
import { setIcon, setIconTeamDiscribe } from "./setIcon.js";

export let newStateObject = JSON.parse(JSON.stringify(prevStateObject));
const showProjectElementsWrapper = document.querySelector(".show-project");
const editProjectElementsWrapper = document.querySelector(".edit-project");

document.querySelector(".상태확인버튼").addEventListener("click", () => {
  console.log("prevStateObject: ", prevStateObject);
  console.log("newStateObject: ", newStateObject);
  // console.log(document.querySelector(".upload-button-hidden").files);
  // document.querySelector(".upload-button-hidden").click();
});
document.querySelector(".수정하기버튼").addEventListener("click", (e) => {
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
      console.log(e.target.parentNode.parentNode.children);

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
