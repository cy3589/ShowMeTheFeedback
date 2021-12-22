const logInBtn = document.querySelector(".loginButton");

logInBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const emailValue = document.querySelector(".emailInput").value;
  const passwordValue = document.querySelector(".passwordInput").value;

  const loginAPI = `http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/auth/login`;
  const options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
  };

  const res = await (await fetch(loginAPI, options)).json();
  console.log(res);
});

async function logIn(params) {
  const response = await fetch();
}
