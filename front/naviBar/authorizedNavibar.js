export function authorizedNaviBar() {
    const authorizedTopNaviBar = document.getElementsByClassName('naviBar')[0];
  
    authorizedTopNaviBar.innerHTML = `
        <div class="naviBar__left">
            <div class="naviBar__logo">
                <a class="naviBar__logo" href="../indexPage">Show Me The Feedback</a>
            </div>
            <div class="naviBar__elements-container">
                <a class="naviBar--home-link" href="../Projects">홈</a>
                <a class="naviBar--my-projects-link" href="../Projects">마이 프로젝트</a>
                <a class="naviBar--my-page-link" href="../myPage">마이 페이지</a>
            </div>
        </div>
        <div class="naviBar__auth">
            <a class="naviBar__logOut" href="../indexPage">로그아웃</a>
        </div>
        <div class="header mobile-menu">
            <div class="burger-container">
                <div id="burger">
                    <div class="bar topBar"></div>
                    <div class="bar btmBar"></div>
                </div>
            </div>
            <div class="icon icon-apple"></div>
            <ul class="menu">
                <li class="menu-item"><a href="#">홈</a></li>
                <li class="menu-item"><a href="#">마이 프로젝트</a></li>
                <li class="menu-item"><a href="#">마이 페이지</a></li>
            </ul>
            <div class="shop icon icon-bag"></div>
        </div>
  `;

  var burger = document.querySelector('.burger-container'),
  header = document.querySelector('.header');

burger.onclick = function() {
  header.classList.toggle('menu-opened');
}
  }
  
  export default { authorizedNaviBar };
  