import { stateObject } from "./stateObject.js";
import { getTokenFromCookies } from "../auth/token.js";
const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export const submitFunc = () => {
  const countFalseIcon = document.querySelectorAll(".check-false").length;
  if (countFalseIcon >= 1) {
    alert("모든 칸을 작성해주세요");
    return false;
  }
  const formData = new FormData();
  const {
    teamName,
    projectName,
    mainFunc,
    skills,
    member,
    postThumbnailsData,
  } = stateObject;
  formData.append("teamName", teamName);
  formData.append("projectName", projectName);
  formData.append("mainFunc", mainFunc);
  formData.append("skills", skills);
  formData.append("member", JSON.stringify(member));

  for (let i = 0; i < postThumbnailsData.length; i++) {
    formData.append("thumbnails", postThumbnailsData[i]);
  }

  const options = {
    method: "POST",
    body: formData,
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
  };
  fetch(`${baseURL}/api/projects`, options)
    .then((result) => result.json())
    .then((result) => {
      if (result.projectId) {
        const { projectId } = result;
        window.location.href = `/reviewPage/${projectId}`;
      }
    });
};
