import { stateObject } from "./stateObject.js";

export const setIconTeamDiscribe = () => {
  const checkElement = document
    .querySelector(".team-discribe")
    .querySelector(".check-icon");
  for (let i = 0; i < stateObject.member.length; i++) {
    if (
      !stateObject.member[i].name ||
      !stateObject.member[i].job ||
      !stateObject.member[i].task
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
