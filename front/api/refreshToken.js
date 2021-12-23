import { getTokenFromCookies } from "../auth/token.js";
import { fetchInstance } from "./fetchInstance.js";

export async function refreshToken() {
  const params = {
    headers: {
      access: `${getTokenFromCookies("accessToken")}`,
      refresh: `${getTokenFromCookies("refreshToken")}`,
    },
  };

  return await fetchInstance("/refresh", params, "get");
}
