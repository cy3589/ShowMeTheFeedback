import { stateObject } from "./stateObject.js";
import { setIconTeamDiscribe } from "./setIcon.js";
export const addMember = () => {
  stateObject.member.push({ name: "", job: "", task: "" });
  const memberLastIndex = stateObject.member.length - 1;
  const targetElement = document.querySelector(".members");

  // 항목별 체크아이콘은 난잡해보임
  // const checkIconDiv = document.createElement("div");
  // checkIconDiv.className = "check-icon";

  const wrapperDiv = document.createElement("div");
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
    e.preventDefault();
    const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
      e.target.parentNode
    );
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    stateObject.member.splice(index, 1);
    setIconTeamDiscribe();
  });

  // wrapperDiv.appendChild(checkIconDiv);
  wrapperDiv.appendChild(inputMemberName);
  wrapperDiv.appendChild(inputMemberJob);
  wrapperDiv.appendChild(inputMemberTask);
  wrapperDiv.appendChild(deleteButton);
  //innerHTML로 처리하면 form 입력 데이터가 초기화되서 element를 구현
  targetElement.appendChild(wrapperDiv);
  setIconTeamDiscribe();
};
