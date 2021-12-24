import { deleteAuthToken, getTokenFromCookies } from "./token.js";

export function logOut() {
  const deleteTargets = ["accessToken", "refreshToken"];

  deleteTargets.map((target) => {
    deleteAuthToken(target, getTokenFromCookies(target));
  });
}
