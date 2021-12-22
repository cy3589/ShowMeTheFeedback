const submitBtn = document.querySelector(".my-page__submit-button");
const myPageInputs = document.getElementsByTagName("input");

let isEqual = false;

myPageInputs["passwordConfirm"].addEventListener("input", () => {
  if (
    myPageInputs["password"].value !== myPageInputs["passwordConfirm"].value
  ) {
    document.querySelector(
      ".my-page__new-password-confirm-input label"
    ).innerHTML = "위와 다릅니다";
    isEqual = false;
  } else {
    document.querySelector(
      ".my-page__new-password-confirm-input label"
    ).innerHTML = "위와 일치합니다!";
    isEqual = true;
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isEqual) {
    alert("비밀번호를 다시 확인해주세요!");
    return;
  }

  const myPageValues = {
    email: myPageInputs["email"].value,
    nickName: myPageInputs["nickName"].value,
    password: myPageInputs["password"].value,
  };

  //myPageValues를 fetch
  console.log(myPageValues);
});
