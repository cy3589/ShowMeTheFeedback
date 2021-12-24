import { getTokenFromCookies } from "../auth/token.js";

const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function getUserValue() {
  const response = await fetch(`${baseURL}/api/users/my-account`, {
    method: "GET",
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
  });

  const data = await response.json();
  const status = response.status;
  return { data, status };
}
