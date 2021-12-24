import { findPassword } from "../api/findPassword.js";

const submitBtn = document.querySelector(".submitValue");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".emailInput").value;
  const res = await findPassword(email);

  if (res.status === 200) {
    alert("가입한 이메일로 임시 비밀번호가 발송되었습니다.");
  }
});
