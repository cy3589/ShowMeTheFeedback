import { getUserValue } from "../api/getUserValue.js";
import {
  updateUserNickName,
  updateUserPassword,
} from "../api/updateUserValue.js";

const submitBtn = document.querySelector(".my-page__submit-button");
const myPageInputs = document.getElementsByTagName("input");

globalThis.addEventListener("load", async () => {
  const userValues = await getUserValue();

  if (userValues.status !== 200) {
    alert("로그인이 필요합니다.");
    history.pushState({ data: null }, null, "../loginPage");
    location.reload();
    return;
  }

  myPageInputs["email"].value = userValues.data.email;
  myPageInputs["nickName"].value = userValues.data.nickname;

  let isEqualPw = true;

  myPageInputs["passwordConfirm"].addEventListener("input", () => {
    if (
      myPageInputs["password"].value !== myPageInputs["passwordConfirm"].value
    ) {
      document.querySelector(
        ".my-page__new-password-confirm-input label"
      ).innerHTML = "위와 다릅니다";
      isEqualPw = false;
    } else {
      document.querySelector(
        ".my-page__new-password-confirm-input label"
      ).innerHTML = "위와 일치합니다!";
      isEqualPw = true;
    }
  });

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!isEqualPw) {
      alert("비밀번호를 다시 확인해주세요!");
      return;
    }

    if (userValues.data.nickname !== myPageInputs["nickName"].value) {
      const { data, status } = await updateUserNickName(
        myPageInputs["nickName"].value
      );
      alert(data.message);

      if (
        myPageInputs["password"].value === "" &&
        myPageInputs["passwordConfirm"].value === ""
      ) {
        location.reload();
      }
    }

    if (
      myPageInputs["password"].value ===
        myPageInputs["passwordConfirm"].value &&
      myPageInputs["password"].value !== "" &&
      myPageInputs["passwordConfirm"].value !== ""
    ) {
      const { data, status } = await updateUserPassword(
        myPageInputs["password"].value,
        myPageInputs["passwordConfirm"].value
      );
      if(data.message){
      alert(`${data.message} 다시 로그인 해주세요.`);
      window.location.href="/loginPage";
    }else{
      alert(`다시 로그인 해주세요.`);
      window.location.href="/loginPage"
    }
      logOut();
      history.pushState({ data: data }, null, "../loginPage");
      location.reload();
    }
  });
});

