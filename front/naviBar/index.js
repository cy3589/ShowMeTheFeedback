import { getTokenFromCookies } from "../auth/token.js";
import { authorizedNaviBar } from "./authorizedNavibar.js";
import { unauthorizedNaviBar } from "./unauthorizedNavibar.js";
import { refreshToken as ref } from "../api/refreshToken.js";
import { logOut } from "../auth/logOut.js";
globalThis.addEventListener("load", async () => {
  const refreshToken = getTokenFromCookies("refreshToken"); //먼저 ref토큰이 살아있는지 확인하고
  const isAuthed = refreshToken !== undefined ? true : false; //살아있다면
  isAuthed ? authorizedNaviBar() : unauthorizedNaviBar(); //탑네비를 먼저 렌더링 시킨다

  const accessToken = getTokenFromCookies("accessToken"); //이후 acc토큰이 유효한지 확인하고
  const accExpired = accessToken === undefined ? true : false; //만료되었다면
  if (accExpired) {
    const res = await ref();
    if (res.status === 200) {
      for (let key in data) {
        saveToken(key, data[key]);
      }
      console.log("tokenRefresh!", res); //acc, ref토큰을 리프레시받는다
    }
    console.log("refresh에 문제가 있습니다!", res);
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
