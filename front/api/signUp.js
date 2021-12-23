const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function signUp(nickname, email, password, authCode) {
  const response = await fetch(`${baseURL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      email,
      password,
      authCode,
    }),
  });

  const data = await response.json();
  const status = response.status;
  console.log(data, status);
  return { data, status };
}
