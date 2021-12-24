export function unauthorizedNaviBar() {
  const authorizedTopNaviBar = document.getElementsByClassName('naviBar')[0];

  authorizedTopNaviBar.innerHTML = `
    <div class="naviBar__logo">Show Me The Feedback</div>
    <div class="naviBar__auth">
      <a class="naviBar__logIn" href="../loginPage" >로그인</a>
      <a class="naviBar__signUp" href="../signUpPage" >회원가입</a>
    </div>
`;
}

export default { unauthorizedNaviBar };
