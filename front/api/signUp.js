import { fetchInstance } from "./fetchInstance.js";

export async function signUp(nickname, email, password, authCode) {
  const params = {
    body: {
      nickname,
      email,
      password,
      authCode,
    },
  };
  return await fetchInstance("/auth/register", params, "post");
}
