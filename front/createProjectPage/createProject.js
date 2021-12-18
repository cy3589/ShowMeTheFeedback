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
  const uploadBtn = document.querySelector(".uploadBtn");
  uploadBtn.click();
};
window.btnClick = btnClick;
window.addMember = addMember;
window.onChangeUpload = onChangeUpload;
window.onChangeTeamName = onChangeTeamName;
window.onChangeProjectName = onChangeProjectName;
window.onChangeMainFunc = onChangeMainFunc;
window.onChangeSkills = onChangeSkills;
window.initOnChangeMemberName = initOnChangeMemberName;
window.initOnChangeMemberJob = initOnChangeMemberJob;
window.initOnChangeMemberTask = initOnChangeMemberTask;
window.submitFunc = submitFunc;

onChangeTeamName();
onChangeProjectName();
onChangeMainFunc();
onChangeSkills();
initOnChangeMemberName();
initOnChangeMemberJob();
initOnChangeMemberTask();
