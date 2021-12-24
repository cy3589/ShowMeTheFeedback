import { logIn } from "../api/logIn.js";
import { saveToken } from "../auth/token.js";

const logInBtn = document.querySelector(".loginButton");

//디버깅 편의상 아이디/비밀번호 기입력
document.querySelector(".emailInput").value = "ansrud45@gmail.com";
document.querySelector(".passwordInput").value = "iw92qt2xl";

logInBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const emailValue = document.querySelector(".emailInput").value;
  const passwordValue = document.querySelector(".passwordInput").value;

  const { data, status } = await logIn(emailValue, passwordValue);

  if (status === 200) {
    for (let key in data) {
      saveToken(key, data[key]);
    }
    history.pushState({ data: data }, null, "../Projects"); //실제 url = /project/projectId123 => fetch res.data.projectId
    location.reload();
  } else {
    alert("이메일 또는 비밀번호를 확인해주세요");
  }
});

// const baseURL =
//   "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

const logInBtnByGoogle = document.querySelector(".loginByGoogleButton");

logInBtnByGoogle.addEventListener("click", async (e) => {
  const res = await fetch(
    "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/auth/google/secrets",
    {
      method: "GET",
    }
  );
  console.log(res.data);
});
