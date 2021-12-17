window.addEventListener("load", () => {
  let authorizedTopNaviBar = document.getElementsByTagName("header")[0];

  let logo = document.createElement("h2");
  let nav = document.createElement("nav");
  let ul = document.createElement("ul");
  let li = new Array(2);
  let a = new Array(4);

  for (let i = 0; i < li.length; i++) {
    li[i] = document.createElement("li");
  }

  for (let i = 0; i < a.length; i++) {
    a[i] = document.createElement("a");
    a[i].style.color = "black";
    a[i].style.textDecoration = "none";
  }

  a[0].innerText = "Show Me The Feedback";
  a[1].innerText = "마이 프로젝트";
  a[2].innerText = "마이 페이지";
  a[3].innerText = "로그아웃";

  a[0].setAttribute("href", "test1.html");
  a[1].setAttribute("href", "test1.html");
  a[2].setAttribute("href", "test1.html");
  a[3].setAttribute("href", "test1.html");

  authorizedTopNaviBar.style.backgroundColor = "white";
  authorizedTopNaviBar.appendChild(logo);
  authorizedTopNaviBar.appendChild(nav);
  authorizedTopNaviBar.appendChild(a[3]);
  logo.appendChild(a[0]);
  nav.appendChild(ul);

  a[3].style.display = "flex";
  a[3].style.marginLeft = "auto";
  a[3].style.marginRight = 20 + "px";

  for (let i = 0; i < li.length; i++) {
    ul.appendChild(li[i]);
    li[i].appendChild(a[i + 1]);
    li[i].style.display = "inline-block";
    li[i].style.margin = 20 + "px";
  }

  logo.style.marginLeft = 20 + "px";
  logo.style.marginRight = 20 + "px";

  authorizedTopNaviBar.style.width = 100 + "%";
  authorizedTopNaviBar.style.height = 70 + "px";
  authorizedTopNaviBar.style.display = "flex";
  authorizedTopNaviBar.style.alignItems = "center";
});
