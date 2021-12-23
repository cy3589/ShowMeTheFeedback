export const saveToken = (tokenName, value) => {
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
