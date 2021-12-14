let isLoading = false;
const io = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) getMoreProject();
});

document.addEventListener("DOMContentLoaded", () => {
  const targetEl = document.getElementById("root");
  targetEl.innerHTML = `<div class="render"></div>`;
  getProjectList().then((result) => {
    document.querySelector(".render").innerHTML += result;
    const targets = document.querySelectorAll(".observeThis");
    const target = targets[targets.length - 1];
    io.observe(target);
  });
});

const root = document.getElementById("root");
const dummyProjects = [];

for (let i = 0; i < 10; i++) {
  dummyProjects.push({
    Title: `타이틀${i}`,
    Image: `https://media.discordapp.net/attachments/919476237720772628/920238099198525470/unknown.png?width=722&height=663`,
    Rating: `${Math.ceil(Math.random() * 5).toString()}`,
    ProjectId: `${parseInt(Math.random() * 100000000000000, 10).toString()}`, // project의 고유ID(더미는 단순하게 랜덤값으로 생성)
  });
}
/* 
  dummyProject:object Array
  object:
  Title, Image, Rating, ProjectId  <- string
*/

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); // setTimeout을 Promise가 반환되도록 하는 함수
const getProjectList = async () => {
  isLoading = true;
  let result = "";
  let temp;
  let fetchedData = await fetch(
    `https://jsonplaceholder.typicode.com/posts`
  ).then((res) => res.json());
  fetchedData = fetchedData
    .map((v) => ({
      Title: v.title,
      Image: `http://placeimg.com/${440 + parseInt(Math.random() * 200, 10)}/${
        280 + parseInt(Math.random() * 200, 10)
      }/any`,
      Rating: Math.ceil(Math.random() * 5).toString(),
      ProjectId: parseInt(Math.random() * 100000000000000, 10).toString(),
    }))
    .slice(0, 10);
  // console.log(fetchedData);
  await wait(400).then(() => (temp = fetchedData));
  isLoading = false;
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
    <a href="./reviewPage?id=${v.ProjectId}">
      <div class="card">
        ${isEnd}
        <div>
          <div class="title">
            ${v.Title}
            <!-- 제목 -->
          </div>
          <div class="thumbnail">
            <img src=${v.Image} /> 
            <!-- 이미지경로 || default이미지경로 -->
          </div>
          <div class="rating">
            ${rate}
          </div>
        </div>
      </div>
    </a>
      `;
  });

  return result;
};
const getMoreProject = async () => {
  // await wait(1000);
  const moreProjects = await getProjectList();
  document.querySelector(".render").innerHTML += moreProjects;
  io.disconnect();
  const targets = document.querySelectorAll(".observeThis");
  const target = targets[targets.length - 1];
  io.observe(target);
};

// document.getElementById("임시버튼").addEventListener("click", getMoreProject);
