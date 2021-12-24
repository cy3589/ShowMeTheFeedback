import { signUp } from "../api/signUp.js";
import { signUpCode } from "../api/signUpCode.js";

const getSignUpCodeButton = document.querySelector(".getSignUpCodeButton");
const signUpCodeInput = document.querySelector(".signUpCodeInput");
const passwordInput = document.querySelector(".passwordInput");
const passwordConfirmInput = document.querySelector(".passwordConfirmInput");
const submitBtn = document.querySelector(".signUpButton");
const nickNameValue = document.querySelector(".nickNameInput");
const emailValue = document.querySelector(".emailInput");

getSignUpCodeButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    nickNameValue.value === "" ||
    emailValue.value === "" ||
    emailValue.value.split("@").length < 2
  ) {
    alert("닉네임과 이메일을 입력해주세요");
    return;
  }

  const { data, status } = await signUpCode(
    nickNameValue.value,
    emailValue.value
  );
  console.log(data, status);
  alert("인증코드가 발송되었습니다.");
  getSignUpCodeButton.innerText = "인증코드 재발송";
  signUpCodeInput.disabled = false;
  signUpCodeInput.style.backgroundColor = "white";
});

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (signUpCodeInput.value === "") {
    alert("인증코드를 입력해주세요");
    return;
  }

  if (passwordInput.value !== passwordConfirmInput.value) {
    alert("비밀번호를 다시 확인해주세요");
    return;
  }

  const { data, status } = await signUp(
    nickNameValue.value,
    emailValue.value,
    passwordInput.value,
    signUpCodeInput.value
  );

  if (status === 201) {
    console.log(data, status);
    alert("가입 완료되었습니다.");
    history.pushState({ data: data }, null, "../loginPage");
    location.reload();
    return;
  }
  console.log(data, status);
  alert("다시 시도해주세요");
});
