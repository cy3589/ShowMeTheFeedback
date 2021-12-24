import { getTokenFromCookies } from "../auth/token.js";
import { authorizedNaviBar } from "./authorizedNavibar.js";
import { unauthorizedNaviBar } from "./unauthorizedNavibar.js";
import { refreshToken as ref } from "../api/refreshToken.js";
import { logOut } from "../auth/logOut.js";

globalThis.addEventListener("load", async () => {
  const refreshToken = getTokenFromCookies("refreshToken");

  const isAuthed = refreshToken !== undefined ? true : false;
  if (!isAuthed) {
    if (globalThis.location.pathname === "/indexPage/") {
      unauthorizedNaviBar();
      return;
    }
    history.pushState({ data: null }, null, "../loginPage");
    location.reload();
  }
  await authorizedNaviBar();

  const accessToken = getTokenFromCookies("accessToken");
  const accExpired = accessToken === undefined ? true : false;
  if (accExpired) {
    const res = await ref();
    if (res.status === 200) {
      for (let key in data) {
        saveToken(key, data[key]);
      }
    }

    alert("다시 로그인 해주세요.");
    history.pushState({ data: null }, null, "../loginPage");
    location.reload();
  }

  const logOutBtn = document.querySelector(".naviBar__logOut");

  logOutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    logOut();

    alert("로그아웃 되었습니다.");
    history.pushState({ data: null }, null, "../loginPage");
    location.reload();
  });
});
