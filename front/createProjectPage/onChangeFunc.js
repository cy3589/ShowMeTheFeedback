import { stateObject } from "./stateObject.js";
import { onChangeFunc } from "./createProject.js";
import { setIcon, setIconTeamDiscribe } from "./setIcon.js";

export const onChangeTeamName = () => {
  const elementId = "team-name";
  const stateId = "teamName";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};
export const onChangeProjectName = () => {
  const elementId = "project-name";
  const stateId = "projectName";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};

export const onChangeMainFunc = () => {
  const elementId = "main-func";
  const stateId = "mainFunc";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};
export const onChangeSkills = () => {
  const elementId = "skills";
  const stateId = "skills";
  const state = onChangeFunc(elementId, stateId);
  setIcon(state, elementId);
};
export const initOnChangeMemberName = () => {
  stateObject.member[0].name =
    document.getElementsByName("member-name")[0].value;
  setIconTeamDiscribe();
};
export const initOnChangeMemberJob = () => {
  stateObject.member[0].job = document.getElementsByName("member-job")[0].value;
  setIconTeamDiscribe();
};
export const initOnChangeMemberTask = () => {
  stateObject.member[0].task =
    document.getElementsByName("member-task")[0].value;
  setIconTeamDiscribe();
};
