const inputEmail = document.getElementsByClassName("");

const logInBtn = document.querySelector(".loginButton");
logInBtn.addEventListener("click", () => {
  history.pushState({ data: "fetchData" }, null, "../Projects");
  location.reload();
});
