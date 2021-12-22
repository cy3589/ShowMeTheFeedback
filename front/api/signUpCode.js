import { fetchInstance } from "./fetchInstance.js";

export function signUpCode(nickname, email) {
  const params = {
    nickname,
    email,
  };
  return fetchInstance("/auth/register/email", params, "post");
}
