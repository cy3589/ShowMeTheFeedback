import { fetchInstance } from "./fetchInstance.js";

export function logIn(email, password) {
  const params = {
    email,
    password,
  };
  return fetchInstance("/auth/login", params, "post");
}
