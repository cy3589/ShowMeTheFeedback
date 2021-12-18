export function unauthorizedNaviBar() {
  const authorizedTopNaviBar = document.getElementsByClassName("naviBar")[0];

  authorizedTopNaviBar.innerHTML = `
    <div class="naviBar__logo">Show Me The Feedback</div>
    <div class="naviBar__auth">
      <div class="naviBar__logIn">로그인</div>
      <div class="naviBar__signUp">회원가입</div>
    </div>
`;
}

export default { unauthorizedNaviBar };
