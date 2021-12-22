import { authorizedNaviBar } from "./authorizedNavibar.js";
import { unauthorizedNaviBar } from "./unauthorizedNavibar.js";

globalThis.addEventListener("load", () => {
  //isAuth: Boolean => 토큰 소지여부에 따라 달라짐
  const isAuth = true;
  return isAuth ? authorizedNaviBar() : unauthorizedNaviBar();
});
