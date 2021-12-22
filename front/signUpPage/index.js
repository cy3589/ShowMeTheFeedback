const getSignUpCodeButton = document.querySelector(".getSignUpCodeButton");
const passwordInput = document.querySelector(".passwordInput");
const passwordConfirmInput = document.querySelector(".passwordConfirmInput");

const startTimer = (timer) => {
  setTimeout(() => {
    timer -= 1;
    if (timer > 1) {
      getSignUpCodeButton.innerText = `인증코드확인중\n${Math.floor(
        timer / 60
      )} : ${
        String(timer % 60).length === 2 ? timer % 60 : "0" + String(timer % 60)
      }`;
      getSignUpCodeButton.addEventListener("click", (e) => {});
      startTimer(timer);
    } else {
      getSignUpCodeButton.innerText = "인증코드재발송";
      getSignUpCodeButton.style.color = "black";
    }
  }, 1000);
};

getSignUpCodeButton.addEventListener("click", (e) => {
  if (
    getSignUpCodeButton.innerText === "인증코드발송" ||
    getSignUpCodeButton.innerText === "인증코드재발송"
  ) {
    e.preventDefault();

    startTimer(180);

    getSignUpCodeButton.style.color = "red";
  } else {
    const isPass = true; //confirmSignUpCode() => 코드유효확인
    if (isPass) {
      e.preventDefault();
      clearTimeout(startTimer);
      alert("확인되었습니다. 비밀번호를 입력해주세요");
      getSignUpCodeButton.innerText = "확인완료!";
      passwordInput.disabled = false;
      passwordConfirmInput.disabled = false;
    } else {
      alert("코드를 다시 확인해주세요");
    }
  }
});
