import {
  onChangeTeamName,
  onChangeProjectName,
  onChangeMainFunc,
  onChangeSkills,
  initOnChangeMemberName,
  initOnChangeMemberJob,
  initOnChangeMemberTask,
} from "./onChangeFunc.js";
import { submitFunc } from "./submitFunc.js";
import { stateObject } from "./stateObject.js";
import { onChangeUpload } from "./onChangeUpload.js";
import { addMember } from "./addMember.js";
export const onChangeFunc = (elementId, stateName) => {
  const nowValue = document.getElementsByName(elementId)[0].value;
  stateObject[stateName] = nowValue;
  return stateObject[stateName];
};
// export const onChangeTeamDiscribe = () => {
//   const elementId = "team-discribe";
//   const stateId = "teamDiscribe";
//   const state = onChangeFunc(elementId, stateId);
//   setIcon(state, elementId);
// };

const btnClick = () => {
  if (stateObject.thumbnails.length > 2) {
    alert("사진은 최대 3개까지만 가능합니다");
    return;
  }
  document.querySelector(".upload-button-hidden").click();
};
// window.submitFunc = submitFunc;
// window.onChangeTeamName = onChangeTeamName;
// window.onChangeProjectName = onChangeProjectName;
// window.onChangeUpload = onChangeUpload;
// window.btnClick = btnClick;
// window.onChangeMainFunc = onChangeMainFunc;
// window.onChangeSkills = onChangeSkills;
// window.initOnChangeMemberName = initOnChangeMemberName;
// window.initOnChangeMemberJob = initOnChangeMemberJob;
// window.initOnChangeMemberTask = initOnChangeMemberTask;
// window.addMember = addMember;
document
  .querySelector(".create-project-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    submitFunc();
  });
submitFunc;
document
  .querySelector(".team-name")
  .querySelector(".team-name")
  .addEventListener("input", onChangeTeamName);
document
  .querySelector(".project-name")
  .querySelector(".project-name")
  .addEventListener("input", onChangeProjectName);
document
  .querySelector(".upload-button-hidden")
  .addEventListener("change", onChangeUpload);
document.querySelector(".upload-button").addEventListener("click", btnClick);
document
  .querySelector(".main-func")
  .querySelector(".main-func")
  .addEventListener("input", onChangeMainFunc);
document
  .querySelector(".skills")
  .querySelector(".skills")
  .addEventListener("input", onChangeSkills);
document
  .querySelector(".team-discribe")
  .querySelector(".members")
  .querySelector(".member-name")
  .addEventListener("input", initOnChangeMemberName);
document
  .querySelector(".team-discribe")
  .querySelector(".members")
  .querySelector(".member-job")
  .addEventListener("input", initOnChangeMemberJob);
document
  .querySelector(".team-discribe")
  .querySelector(".members")
  .querySelector(".member-task")
  .addEventListener("input", initOnChangeMemberTask);
document.querySelector(".add-member").addEventListener("click", (e) => {
  e.preventDefault();
  addMember();
});

onChangeTeamName();
onChangeProjectName();
onChangeMainFunc();
onChangeSkills();
initOnChangeMemberName();
initOnChangeMemberJob();
initOnChangeMemberTask();
