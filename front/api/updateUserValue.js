import { getTokenFromCookies } from "../auth/token.js";

const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function updateUserNickName(changeNickname) {
  const response = await fetch(`${baseURL}/api/users/my-account`, {
    method: "POST",
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
    body: JSON.stringify({
      changeNickname,
    }),
  });

  const data = await response.json();
  const status = response.status;
  console.log(data, status);
  return { data, status };
}

export async function updateUserPassword(password, confirmPassword) {
  const response = await fetch(`${baseURL}/api/users/my-account`, {
    method: "POST",
    headers: {
      access: getTokenFromCookies("accessToken"),
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  });

  const data = await response.json();
  const status = response.status;
  console.log(data, status);
  return { data, status };
}
