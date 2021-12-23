import { stateObject } from "./stateObject.js";
import { getTokenFromCookies } from "../auth/token.js";
export const submitFunc = (e) => {
  e.preventDefault();
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
      access: getTokenFromCookies(accessToken),
    },
  };
  fetch(
    "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/api/projects",
    options
  )
    .then((result) => result.json())
    .then((result) => {
      if (result.message) {
        alert("프로젝트를 생성했습니다.");
        window.location.href(`/project/${result.projectId}`);
      } else {
        alert(result.error);
      }
    });
};
