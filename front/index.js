document.addEventListener("DOMContentLoaded", () => {
  const targetEl = document.getElementById("root");
  targetEl.innerHTML = `<div class="render"></div>`;
  getProjectList()
    .then((result) => (document.querySelector(".render").innerHTML += result))
    .then(() => {
      io.observe(document.querySelector(".observeThis"));
    });
});

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    console.log(entry.isIntersecting);
  });
});
// io.observe(document.querySelector(".observeThis"));
// console.log(document.querySelector(".observeThis"));

const root = document.getElementById("root");
// import { html } from "https://cdn.skypack.dev/lit";
// const userDummy1 = {
//   id: "유저1 고유아이디",
//   Name: "유저이름1",
//   Email: "유저이메일1",
// };
// const userDummy1 = {
//   id: "유저2 고유아이디",
//   Name: "유저2 이름",
//   Email: "유저2 이메일",
// };
const dummyProjects = [];

const dummyProject1 = {
  Title: "타이틀1",
  Image:
    "https://media.discordapp.net/attachments/919476237720772628/920238099198525470/unknown.png?width=722&height=663",
  Rating: "5",
};
const dummyProject2 = {
  Title: "타이틀2",
  Image:
    "https://media.discordapp.net/attachments/919476237720772628/920238099198525470/unknown.png?width=722&height=663",
  Rating: "3",
};
for (let i = 0; i < 10; i++) {
  dummyProjects.push({
    Title: `타이틀${i}`,
    Image: `https://media.discordapp.net/attachments/919476237720772628/920238099198525470/unknown.png?width=722&height=663`,
    Rating: `${Math.ceil(Math.random() * 5)}`,
  });
}
// const dummyProjects = [dummyProject1, dummyProject2];
const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const getProjectList = async () => {
  let result = "";
  let temp;
  await wait(1500).then(() => (temp = dummyProjects));
  const projects = temp;
  projects.forEach((v, i) => {
    let isEnd = "";
    let rate = "";
    for (let i = 0; i < 5; i++) {
      if (i < parseInt(v.Rating, 10))
        rate += /*html*/ `<span class="fill-star">★</span>`;
      else rate += /*html*/ `<span class="star">☆</span>`;
    }
    if (i >= 9) isEnd = /* html */ `<div class="observeThis"></div>`;
    result += /*html*/ `
      <div class="card">
        ${isEnd}
        <div>
          <div class="title">
            ${v.Title}
          </div>
          <div class="thumbnail">
            <img src=${v.Image} />
          </div>
          <div class="rating">
            ${rate}
          </div>
        </div>
      </div>
  `;
  });

  return result;
};
// getProjectList().then((result) => (root.innerHTML += result));
const getMoreProject = async () => {
  await wait(1000);
  getProjectList()
    .then((result) => (document.querySelector(".render").innerHTML += result))
    .then(() => {
      io.observe(document.querySelector(".observeThis"));
    });
};
document.getElementById("임시버튼").addEventListener("click", getMoreProject);
