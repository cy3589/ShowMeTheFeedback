import { getIndexPageValue } from "../api/getIndexPageValue.js";
const ProjectCnt = document.querySelector(".total-project__number");
const FeedbackCnt = document.querySelector(".total-feedback__number");
const UserCnt = document.querySelector(".total-user__number");

globalThis.addEventListener("load", async () => {
  const indexPageValues = await getIndexPageValue();
  const { users, comments, projects } = indexPageValues.data;

  ProjectCnt.innerText = projects;
  FeedbackCnt.innerText = comments;
  UserCnt.innerText = users;
});
