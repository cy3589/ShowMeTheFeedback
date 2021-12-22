export const saveToken = (tokenName, value) => {
  const hour = 3600;

  if (tokenName === "accessToken") {
    document.cookie = `${tokenName}=${value}; max-age=${hour}`; //1시간
  }

  if (tokenName === "refreshToken") {
    document.cookie = `${tokenName}=${value}; max-age=${hour * 24 * 14}`; //2주
  }

  document.cookie = `${tokenName}=${value};`;
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
  document.cookie = `${tokenName}=${value}; max-age=-1;`;
}
