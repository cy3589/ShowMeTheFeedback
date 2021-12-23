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
  console.log("보내는 formData", formData);
  const options = {
    method: "POST",
    body: formData,
    headers: {
<<<<<<< HEAD
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
=======
      access:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFuc3J1ZDQ1QGdtYWlsLmNvbSIsImlhdCI6MTY0MDI0NzkyMCwiZXhwIjoxNjQwMjUxNTIwfQ.wgcbScg8MddD3mSgkFiGTry1l7RF2Louj9IP33RNxNk",
    },
  };
  fetch(`${baseURL}/api/projects`, options)
    .then((result) => {
      console.log("초기res", result);
      if (result.status === 201) {
        // window.location.href = `/project/${result.projectId}`;
        console.log("성공res", result);
        return result.json();
      } else {
        // alert("게시글 등록에 실패하였습니다. 다시 시도해주세요");
        console.log("실패res", result);
      }
    })
    .then((res) => {
      console.log("성공 json res", res);
    });
  // const option = {
  //   method: "post",
  //   body: JSON.stringify({ a: 123, b: 456 }),
  // };
  // fetch("http://localhost:8080/api/post/project", option);
  return false;
  // return true;
>>>>>>> 06589778650b89fa8a698a131684d532ae346b7c
};
