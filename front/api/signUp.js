import { fetchInstance } from "./fetchInstance.js";

export async function signUp(nickname, email, password, authCode) {
  const params = {
    nickname,
    email,
    password,
    authCode,
  };
  return await fetchInstance("/auth/register", params, "post");
}
