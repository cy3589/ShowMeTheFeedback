export function authorizedNaviBar() {
  const authorizedTopNaviBar = document.getElementsByClassName("naviBar")[0];

  authorizedTopNaviBar.innerHTML = `
    <div class="naviBar__logo">Show Me The Feedback</div>
    <div class="naviBar__elements-container">
        <a class="naviBar--home-link" href="../Projects">홈</a>
        <a class="naviBar--my-projects-link" href="../Projects">마이 프로젝트</a>
        <a class="naviBar--my-page-link" href="../myPage">마이 페이지</a>
    </div>
    <div class="naviBar__auth">
        <a class="naviBar__logOut" href="../indexPage">로그아웃</a>
    </div>
`;
}

export default { authorizedNaviBar };
