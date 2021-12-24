import { newStateObject as stateObject } from "./editProject.js";
import { setIconTeamDiscribe } from "./setIcon.js";
export const addMember = () => {
  stateObject.members.push({ name: "", job: "", task: "" });
  const targetElement = document.querySelector(".members");

  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "member";
  const inputMemberName = document.createElement("input");
  inputMemberName.type = "text";
  inputMemberName.placeholder = "이름";
  inputMemberName.name = "member-name";
  inputMemberName.addEventListener("input", (e) => {
    const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
      e.target.parentNode
    );
    stateObject.members[index].name = e.target.value;
    setIconTeamDiscribe();
  });

  const inputMemberJob = document.createElement("input");
  inputMemberJob.type = "text";
  inputMemberJob.placeholder = "담당업무";
  inputMemberJob.name = "member-job";
  inputMemberJob.addEventListener("input", (e) => {
    const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
      e.target.parentNode
    );
    stateObject.members[index].job = e.target.value;
    setIconTeamDiscribe();
  });

  const inputMemberTask = document.createElement("input");
  inputMemberTask.type = "text";
  inputMemberTask.placeholder = "업무내용";
  inputMemberTask.name = "member-task";
  inputMemberTask.addEventListener("input", (e) => {
    const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
      e.target.parentNode
    );
    stateObject.members[index].task = e.target.value;
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
    stateObject.members.splice(index, 1);
    setIconTeamDiscribe();
  });

  wrapperDiv.appendChild(inputMemberName);
  wrapperDiv.appendChild(inputMemberJob);
  wrapperDiv.appendChild(inputMemberTask);
  wrapperDiv.appendChild(deleteButton);
  targetElement.appendChild(wrapperDiv);
  setIconTeamDiscribe();
};
