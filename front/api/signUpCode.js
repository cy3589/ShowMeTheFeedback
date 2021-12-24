const baseURL =
  "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

export async function signUpCode(nickname, email) {
  const response = await fetch(`${baseURL}/api/auth/register/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      email,
    }),
  });

  const data = await response.json();
  const status = response.status;
  return { data, status };
}
