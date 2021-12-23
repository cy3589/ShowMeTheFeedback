export const saveToken = (tokenName, value) => {
  const hour = "3600";

  if (tokenName === "accessToken") {
    document.cookie = `${tokenName}=${value}; path=/; max-age=${hour};`; //1시간
    return;
  }

  if (tokenName === "refreshToken") {
    document.cookie = `${tokenName}=${value}; path=/; max-age=${String(
      Number(hour) * 24 * 14
    )}`;
    return;
  }

  document.cookie = `${tokenName}=${value}; path=/;`;
};

export const getTokenFromCookies = (tokenName) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        tokenName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteAuthToken(tokenName, value) {
  document.cookie = `${tokenName}=${value}; path=/; max-age=-1;`;
}
