import { getUserValue } from "../api/getUserValue.js";
import { logOut } from "../auth/logOut.js";

export async function authorizedNaviBar() {
  const authorizedTopNaviBar = document.getElementsByClassName("naviBar")[0];

  const { data, status } = await getUserValue();

  if (data.nickname === undefined) {
    alert("로그아웃 되었습니다.");
    logOut();
    history.pushState({ data: null }, null, "../loginPage");
    location.reload();
  }

  authorizedTopNaviBar.innerHTML = `
        <div class="naviBar__left">
            <div class="naviBar__logo">
                <a class="naviBar__logo" href="../indexPage">Show Me The Feedback</a>
            </div>
            <div class="naviBar__elements-container">
                <a class="naviBar--home-link" href="../Projects">홈</a>
                <a class="naviBar--my-projects-link" href="../Projects/my-projects">마이 프로젝트</a>
                <a class="naviBar--my-page-link" href="../myPage">마이 페이지</a>
            </div>
        </div>
        <div class="naviBar__auth">
            <a class="naviBar__nickName" href="../myPage">${data.nickname}</a>
            <i class="fas fa-bars"></i>
            <a class="naviBar__logOut" href="../indexPage">로그아웃</a>
            <i class="fas fa-bars"></i>
        </div>
  `;

  const bars = document.querySelector(".fa-bars");
  const naviBar = document.querySelector(".naviBar");
  bars.addEventListener("click", () => {
    naviBar.classList.toggle("open");
  });
}

export default { authorizedNaviBar };
