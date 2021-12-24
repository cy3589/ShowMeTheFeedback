import { getTokenFromCookies } from "../auth/token.js";
import { authorizedNaviBar } from "./authorizedNavibar.js";
import { unauthorizedNaviBar } from "./unauthorizedNavibar.js";
import { refreshToken as ref } from "../api/refreshToken.js";
import { logOut } from "../auth/logOut.js";
globalThis.addEventListener("load", async () => {
  const refreshToken = getTokenFromCookies("refreshToken");
  const isAuthed = refreshToken !== undefined ? true : false;
  isAuthed ? authorizedNaviBar() : unauthorizedNaviBar();

  const accessToken = getTokenFromCookies("accessToken");
  const accExpired = accessToken === undefined ? true : false;
  if (accExpired) {
    const res = await ref();
    if (res.status === 200) {
      for (let key in data) {
        saveToken(key, data[key]);
      }
    }
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
