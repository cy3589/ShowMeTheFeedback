const root = document.getElementById("root");
let _lastId = null;
import { getTokenFromCookies } from "../auth/token.js";
// 인피니티 스크롤을 위한 인터섹션 옵저버와 실행할 콜백함수 정의
// const io = new IntersectionObserver((entries, observer) => {
//   if (entries[0].isIntersecting) getMoreProject(_lastId);
// });
// const getMoreProject = async (lastId) => {
//   // await wait(1000);
//   const moreProjects = await getProjectList(lastId);
//   document.querySelector(".render").innerHTML += moreProjects;
//   io.disconnect();
//   const targets = document.querySelectorAll(".observeThis");
//   const target = targets[targets.length - 3];
//   io.observe(target);
// };

const getDate = (date) => {
  // dateString을 얻기위한 임시 함수, 백엔드에서 형식에 맞게 보내준다면 생략 가능, 또는 dayjs이용가능(빌드필요)
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  return dateString;
};

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); // setTimeout을 Promise가 반환되도록 하는 함수

const getProjectList = async (lastId) => {
  // 옵저버를 이용한 인피니티 스크롤 구현 시 백엔드 요청 API에 lastID값을 날리기 위해 인자로 lastID값을 받음
  // 이용하지 않는다면 lastId는 생략 가능
  let isGetMyProject = location.pathname.match(/\w+/g)[1] === "myProjects";
  let result = "";
  let temp;
  // let fetchURL = API_URL
  // let fetchURL = "";
  // if (isGetMyProject) fetchURL += `http://localhost:8080/api/myData/${lastId}`;
  // // LastId로 API요청
  // else fetchURL += "https://jsonplaceholder.typicode.com/posts";
  // let fetchedData = await fetch(fetchURL).then((res) => res.json());
  // if (!isGetMyProject) {
  //   fetchedData = fetchedData
  //     .map((v) => ({
  //       Title: v.title,
  //       Image:
  //         "https://s3-alpha-sig.figma.com/img/b3fd/2d1d/de486d511bc4ffd77c7b74c5fcec860a?Expires=1640563200&Signature=Z51KL7qTLBT1rpd7tmydxvmrHZjzyqq4~gkPw28Pywih7yu~DPu2iJTwD1S1GRUFnTpin3SBEl7b0zxoDIWuZu6s4iB-~sE5aJ4T~lQtWM9tMr2MsL8B-ZFHYMCBl35Tkqr7re2sGr68aK9DsQzhNCP7u5XGVsf~AbghtRgtMyF91ZanxzgOAEtvRcIXBCix9~bsiGdDv2LJ8pmFkMl-rWhE2prGSR61kwx8lx15D2YEPW7el8zjt8Fd7soMKus5WkTO~wCgZ6l-8kDVEzKDrq891Hcy28bNdkxvDDAMx1dR5xzsU3GHn8FSQKj3i0uGG0GOJ48NUvnH~CsN2SzhNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  //       Rating: Math.ceil(Math.random() * 5).toString(),
  //       ProjectId: parseInt(Math.random() * 100000000000000, 10).toString(),
  //       Avatar: "",
  //       createdAt: getDate(new Date()),
  //       Avatar: Math.random() > 0.5 ? `https://joeschmoe.io/api/v1/random` : "",
  //       Author: Math.random().toString(36).substr(2, 11),
  //     }))
  //     .slice(0, 10); // 10개씩 갖고온다고 가정
  // }
  // await wait(1800).then(() => (temp = fetchedData)); // 백엔드에서 데이터를 받을 때 지연시간을 고려하여 임의로 1.8초 대기 후 fetchedData사용
  // _lastId = fetchedData[fetchedData.length - 1].ProjectId;
  const option = {
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
  };
  const projects = await fetch(
    "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/api/projects",
    option
  ).then((result) => result.json());

  // .then(console.log);
  // fetch로 데이터를 갖고온 후 사용할 값에 맞게 가공하여 projects에 저장
  // projects의 데이터를 순회하며 innerHTML로 넣을 값으로 가공하여 results생성
  [].forEach.call(projects, (v, i) => {
    
    let isEnd = ""; 
    let rating = "";
    console.log(v);
    for (let i = 0; i < 5; i++) {  
      if (i < parseInt(v.averageRating, 10))
        rating += /*html*/ `<span class="fill-star">★</span>`;
      else rating += /*html*/ `<span class="star">☆</span>`;
    }
    if (i >= 7) isEnd = /* html */ `<div class="observeThis"></div>`;
    let avatarHTMLstring = `<div class="avatar-char">5</div>`;
    avatarHTMLstring = v.Avatar
      ? `<img class="avatar-image" src="${v.avatar}" alt = ${v.avatar} />`
      : `<div class="avatar-char">${v.author[0]}</div>`;

    // author,averageRating,createdAt,projectId,projectName,thumbnails[0]
    result += /*html*/ `
    <a href="/reviewPage/${v.projectId}">
      <div class="card">
        ${isEnd}  
        <div class="thumbnail">
          <img src=${
            encodeURI(v.thumbnails[0])
              ? encodeURI(v.thumbnails[0])
              : "https://s3-alpha-sig.figma.com/img/b3fd/2d1d/de486d511bc4ffd77c7b74c5fcec860a?Expires=1640563200&Signature=Z51KL7qTLBT1rpd7tmydxvmrHZjzyqq4~gkPw28Pywih7yu~DPu2iJTwD1S1GRUFnTpin3SBEl7b0zxoDIWuZu6s4iB-~sE5aJ4T~lQtWM9tMr2MsL8B-ZFHYMCBl35Tkqr7re2sGr68aK9DsQzhNCP7u5XGVsf~AbghtRgtMyF91ZanxzgOAEtvRcIXBCix9~bsiGdDv2LJ8pmFkMl-rWhE2prGSR61kwx8lx15D2YEPW7el8zjt8Fd7soMKus5WkTO~wCgZ6l-8kDVEzKDrq891Hcy28bNdkxvDDAMx1dR5xzsU3GHn8FSQKj3i0uGG0GOJ48NUvnH~CsN2SzhNA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          } /> 
        </div>
        <div class="contents">
        <div class="avatar">
          ${avatarHTMLstring}        
          </div>
          <div class="title-rating">
            <div class="title">${v.projectName}</div>
            <div class="rating">${rating}</div>
          </div>
          <div class="createdAt">${getDate(new Date(v.createdAt))}</div>
        </div>
      </div>
    </a>
    `;
  });
  //innerHTML로 넣을 데이터를 반환
  return result;
};

const firstRender = () => {
  const targetEl = document.getElementById("root");
  targetEl.innerHTML = `<div class="render"></div>`;
  getProjectList().then((result) => {
    document.querySelector(".render").innerHTML = result;
    const targets = document.querySelectorAll(".observeThis");
    const target = targets[targets.length - 1];
    // io.observe(target);
  });
};
const navigateTo = (url) => {
  history.pushState(null, null, url);
  firstRender();
};

window.addEventListener("popstate", firstRender);

document.addEventListener("DOMContentLoaded", firstRender);

document.addEventListener("DOMContentLoaded", () => {
  // 홈과 내프로젝트 페이지 전환 시 SPA처럼 동작하도록 구현
  document.body.addEventListener("click", (e) => {
    if (
      e.target.matches("[id='header-home']") ||
      e.target.matches("[id='header-my-project']")
    ) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
});

const createProjectBtn = document.querySelector(".create-project__button");
createProjectBtn.addEventListener("click", () => {
  history.pushState({ data: null }, null, "../createProjectPage");
  location.reload();
});
