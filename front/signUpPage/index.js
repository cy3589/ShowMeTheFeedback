import { signUp } from "../api/signUp.js";
import { signUpCode } from "../api/signUpCode.js";

const getSignUpCodeButton = document.querySelector(".getSignUpCodeButton");
const signUpCodeInput = document.querySelector(".signUpCodeInput");
const passwordInput = document.querySelector(".passwordInput");
const passwordConfirmInput = document.querySelector(".passwordConfirmInput");
const submitBtn = document.querySelector(".signUpButton");
const nickNameValue = document.querySelector(".nickNameInput");
const emailValue = document.querySelector(".emailInput");

getSignUpCodeButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    nickNameValue.value === "" ||
    emailValue.value === "" ||
    emailValue.value.split("@").length < 2
  ) {
    alert("닉네임과 이메일을 입력해주세요");
    return;
  }

  const { data, status } = signUpCode(nickNameValue.value, emailValue.value);
  console.log(data, status);
  alert("인증코드가 발송되었습니다.");
  getSignUpCodeButton.innerText = "발송됐습니다";
  signUpCodeInput.disabled = false;
  signUpCodeInput.style.backgroundColor = "white";
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (signUpCodeInput.value === "") {
    alert("인증코드를 입력해주세요");
    return;
  }

  if (passwordInput.value !== passwordConfirmInput.value) {
    alert("비밀번호를 다시 확인해주세요");
    return;
  }

  const { data, status } = signUp(
    nickNameValue.value,
    emailValue.value,
    passwordInput.value,
    signUpCodeInput.value
  );
  console.log(data, status);
});

// const writeTimer = (timer) => {
//   getSignUpCodeButton.innerText = `코드인증\n${Math.floor(timer / 60)} : ${
//     String(timer % 60).length === 2 ? timer % 60 : "0" + String(timer % 60)
//   }`;
// };

// getSignUpCodeButton.addEventListener("click", (e) => {});
//       submitBtn.style.backgroundColor = "#ff6b6b";

// const startTimer = (timer) => {
//   setTimeout(() => {

//     timer -= 1;
//     if (timer > 0) {
//       writeTimer(timer);

//       console.log(timer);

//       getSignUpCodeButton.addEventListener("click", (e) => {
//         e.preventDefault();
//         clearTimeout(startTimer());
//         return;
//       });

//       startTimer(timer);
//     } else {
//       console.log(timer);

//       getSignUpCodeButton.innerText = "인증코드재발송";
//       getSignUpCodeButton.style.color = "black";
//       submitBtn.style.backgroundColor = "#bbbbbb";
//     }
//   }, 1000 * timer);
// };

// getSignUpCodeButton.addEventListener("click", (e) => {
//   let timer = 5;

//   if (
//     getSignUpCodeButton.innerText === "인증코드발송" ||
//     getSignUpCodeButton.innerText === "인증코드재발송"
//   ) {
//     e.preventDefault();
//     alert(
//       `이메일로 인증코드가 발급되었습니다.\n시간내에 코드를 입력하고 코드인증을 클릭하세요.`
//     );
//     let timer = 180;
//     startTimer(timer);

//     signUpCodeInput.style.backgroundColor = "white";
//     signUpCodeInput.disabled = false;

//     getSignUpCodeButton.style.color = "red";
//   } else {
//     const isPass = true; //confirmSignUpCode() => 코드유효확인
//     if (isPass) {
//       e.preventDefault();
//       timer = 0;
//       clearTimeout(startTimer);
//       alert("확인되었습니다. 비밀번호를 입력해주세요");
//       getSignUpCodeButton.innerText = "확인완료!";
//     } else {
//       alert("코드를 다시 확인해주세요");
//     }
//   }
// });

// submitBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (getSignUpCodeButton.innerText === "인증코드발송") {
//     alert("인증코드를 ");
//   }
// });
