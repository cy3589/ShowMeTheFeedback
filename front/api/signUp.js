import { fetchInstance } from "./fetchInstance.js";

export function signUp(nickname, email, password, authCode) {
  const params = {
    nickname,
    email,
    password,
    authCode,
  };
  console.log(params);
  return fetchInstance("/auth/register", params, "post");
}
