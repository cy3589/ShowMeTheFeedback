import { fetchInstance } from "./fetchInstance.js";

export async function logIn(email, password) {
  const params = {
    body: {
      email,
      password,
    },
  };

  return await fetchInstance("/auth/login", params, "post");
}
