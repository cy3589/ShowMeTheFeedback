import { getTokenFromCookies } from "../auth/token.js";
import { authorizedNaviBar } from "./authorizedNavibar.js";
import { unauthorizedNaviBar } from "./unauthorizedNavibar.js";

globalThis.addEventListener("load", () => {
  const accessToken = getTokenFromCookies("accessToken");
  const isAuth = accessToken !== undefined ? true : false;
  return isAuth ? authorizedNaviBar() : unauthorizedNaviBar();
});
