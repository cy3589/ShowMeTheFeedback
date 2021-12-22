// const inputEmail = document.getElementsByClassName("");

// const logInBtn = document.querySelector(".loginButton");
// logInBtn.addEventListener("click", () => {
//   history.pushState({ data: "fetchData" }, null, "../Projects");
//   location.reload();
// });

const baseURL = "elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000";

const logInBtn = document.querySelector(".loginButton");

logInBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const emailValue = document.querySelector(".emailInput").value;
  const passwordValue = document.querySelector(".passwordInput").value;

  const config = {
    email: emailValue,
    password: passwordValue,
  };

  console.log(config);

  const response = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    body: config,
  });

  console.log(response.data);
});
