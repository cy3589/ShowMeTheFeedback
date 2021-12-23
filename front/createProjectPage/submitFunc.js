import { stateObject } from "./stateObject.js";

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
    teamDiscribe,
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
  };
  fetch("http://localhost:8080/api/post/project", options).then((result) => {
    // console.log(result);
    // if (result.success === "true") {
    //   window.location.href = `/project/${result.projectId}`;
    // } else {
    //   alert("게시글 등록에 실패하였습니다. 다시 시도해주세요");
    // }
  });
  // const option = {
  //   method: "post",
  //   body: JSON.stringify({ a: 123, b: 456 }),
  // };
  // fetch("http://localhost:8080/api/post/project", option);
  return false;
  // return true;
};
