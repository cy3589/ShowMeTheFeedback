const express = require("express");
const path = require("path");
const projectsRouter = require("./Projects/projectsRouter.js");
// const project = require("/project");
const loginRouter = require("./loginPage/loginRouter.js");
const indexRouter = require("./indexPage/indexRouter.js");
const projectRouter = 11;
const port = 5000;

const app = express();

app.use(express.static(path.join(__dirname, "/")));
app.use("/", indexRouter);
// app.use("/reviewPage", reviewPage);
app.use("/projects", projectsRouter);
app.use("/login", loginRouter);
app.get("/logout", (req, res, next) => {
  const sendMessage = {
    message: "로그아웃페이지 get 요청에 대한 프론트 서버 응답입니다.",
    requirement: "로그아웃 요청에 대한 처리와 응답 프론트 동작 필요",
  };
  res.json(sendMessage);
});

app.get("/join", (req, res, next) => {
  res.send("회원가입페이지 get 요청에 대한 프론트 서버 응답입니다.");
});

app.listen(port, () => {
  console.log("FrontEnd Server is running on port ", port);
});
