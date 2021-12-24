import { logIn } from "../api/logIn.js";
import { saveToken } from "../auth/token.js";

const logInBtn = document.querySelector(".loginButton");

logInBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const emailValue = document.querySelector(".logInEmailInput").value;
  const passwordValue = document.querySelector(".logInPasswordInput").value;

  const { data, status } = await logIn(emailValue, passwordValue);

  if (status === 200) {
    for (let key in data) {
      saveToken(key, data[key]);
    }
    history.pushState({ data: data }, null, "../Projects");
    location.reload();
  } else {
    alert("이메일 또는 비밀번호를 확인해주세요");
  }
});

const logInBtnByGoogle = document.querySelector(".loginByGoogleButton");

logInBtnByGoogle.addEventListener("click", async () => {
  await fetch(
    "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/auth/google/secrets",
    {
      method: "GET",
    }
  );
});
