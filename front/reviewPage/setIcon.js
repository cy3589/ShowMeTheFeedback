import { newStateObject as stateObject } from "./editProject.js";

export const setIconTeamDiscribe = () => {
  const checkElement = document
    .querySelector(".team-discribe")
    .querySelector(".check-icon");
  for (let i = 0; i < stateObject.members.length; i++) {
    if (
      !stateObject.members[i].name ||
      !stateObject.members[i].job ||
      !stateObject.members[i].task
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
};

export const setIcon = (state, className) => {
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
