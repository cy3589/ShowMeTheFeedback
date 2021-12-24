import { getTokenFromCookies } from "../auth/token.js";

const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function refreshToken() {
  console.log({
    access: getTokenFromCookies("accessToken"),
    refresh: getTokenFromCookies("refreshToken"),
  });
  const response = await fetch(`${baseURL}/api/refresh`, {
    method: "GET",
    headers: {
      access: getTokenFromCookies("accessToken"),
      refresh: getTokenFromCookies("refreshToken"),
    },
  });

  const data = await response.json();
  const status = response.status;
  console.log(data, status);
  return { data, status };
}
