export function authorizedNaviBar() {
  const authorizedTopNaviBar = document.getElementsByClassName("naviBar")[0];

  authorizedTopNaviBar.innerHTML = `
    <div class="naviBar__logo">Show Me The Feedback</div>
    <div class="naviBar__elements-container">
        <a class="naviBar--home-link" href=".">홈</a>
        <a class="naviBar--my-projects-link" href=".">마이 프로젝트</a>
        <a class="naviBar--my-page-link"href=".">마이 페이지</a>
    </div>
    <div class="naviBar__auth">
        <div class="naviBar__logOut">로그아웃</div>
    </div>
`;
}

export default { authorizedNaviBar };
