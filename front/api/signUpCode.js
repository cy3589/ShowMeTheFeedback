import { fetchInstance } from "./fetchInstance.js";

export async function signUpCode(nickname, email) {
  const params = {
    nickname,
    email,
  };
  return await fetchInstance("/auth/register/email", params, "post");
}