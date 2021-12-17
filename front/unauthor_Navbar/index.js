window.addEventListener("load", () => {
  //topNavibar 배치시 기본 body margin, padding 초기화
  const body = document.getElementsByTagName("body")[0];
  body.style.margin = 0;
  body.style.padding = 0;
  body.style.boxSizing = "border-box";

  let authorizedTopNaviBar = document.getElementsByTagName("header")[0];

  let logo = document.createElement("h2");
  let nav = document.createElement("nav");
  let ul = document.createElement("ul");
  let li = new Array(2);
  let a = new Array(3);

  for (let i = 0; i < li.length; i++) {
    li[i] = document.createElement("li");
  }

  for (let i = 0; i < a.length; i++) {
    a[i] = document.createElement("a");
    a[i].style.color = "black";
    a[i].style.textDecoration = "none";
  }

  a[0].innerText = "Show Me The Feedback";
  a[1].innerText = "로그인";
  a[2].innerText = "회원가입";

  a[0].setAttribute("href", "test1.html");
  a[1].setAttribute("href", "test1.html");
  a[2].setAttribute("href", "test1.html");

  authorizedTopNaviBar.style.backgroundColor = "white";
  authorizedTopNaviBar.appendChild(logo);
  authorizedTopNaviBar.appendChild(nav);
  logo.appendChild(a[0]);
  nav.appendChild(ul);

  for (let i = 0; i < li.length; i++) {
    ul.appendChild(li[i]);
    li[i].appendChild(a[i + 1]);
    li[i].style.display = "inline-block";
    li[i].style.margin = 20 + "px";
  }

  logo.style.marginTop = "auto";
  logo.style.marginBottom = "auto";
  logo.style.marginLeft = 20 + "px";
  logo.style.marginRight = 20 + "px";

  nav.style.display = "gird";

  authorizedTopNaviBar.style.width = 100 + "%";
  authorizedTopNaviBar.style.height = 70 + "px";
  authorizedTopNaviBar.style.display = "flex";
  authorizedTopNaviBar.style.justifyContent = "space-between";
  authorizedTopNaviBar.style.alignItems = "center";
});
