const root = document.getElementById("root");
let _lastId = null;
import { getTokenFromCookies } from "../auth/token.js";

const getDate = (date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  return dateString;
};

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const getProjectList = async (lastId) => {
  let result = "";
  const option = {
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
  };
  const getAllProjectsURL =
    "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/api/projects";
  const getMyProjectsURL =
    "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/api/users/my-projects";
  let fetchURL = getAllProjectsURL;
  const pathNameArr = window.location.pathname.split("/");
  if (pathNameArr[pathNameArr.length - 1] === "my-projects")
    fetchURL = getMyProjectsURL;
  const projects = await fetch(fetchURL, option).then((result) =>
    result.json()
  );

  [].forEach.call(projects, (v, i) => {
    let isEnd = "";
    let rating = "";
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

    result += /*html*/ `
    <a href="/reviewPage/${v.projectId}">
      <div class="card">
        ${isEnd}  
        <div class="thumbnail">
          <img src=${
            v.thumbnails.length !== 0
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
  return result;
};

const firstRender = () => {
  const targetEl = document.getElementById("root");
  targetEl.innerHTML = `<div class="render"></div>`;
  getProjectList().then((result) => {
    document.querySelector(".render").innerHTML = result;
  });
};
const navigateTo = (url) => {
  history.pushState(null, null, url);
  firstRender();
};

window.addEventListener("popstate", firstRender);

document.addEventListener("DOMContentLoaded", firstRender);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (
      e.target.className === "naviBar--home-link" ||
      e.target.className === "naviBar--my-projects-link"
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
