const express = require("express");
const path = require("path");
const projectsRouter = require("./Projects/projectsRouter.js");
// const project = require("/project");
// const loginRouter = require("./loginPage/loginRouter.js");
// const logoutRouter = require("./logoutPage/logoutRouter.js");
const indexRouter = require("./indexPage/indexRouter.js");
const createProjectRouter = require("./createProjectPage/createProjectRouter");
const cookieParser = require("cookie-parser");
// const projectRouter = 11;
const port = 5000;

const app = express();
app.use("/", indexRouter);
// app.use("/", (req, res, next) => {
//   console.log("test");
//   res.send("test");
// });
app.use(cookieParser());

// app.use("/reviewPage", reviewPage);
app.use("/projects", projectsRouter);
// app.get("/login", require("./loginPage/index"));
app.get("/login", (req, res, next) => {
  res.redirect("/loginPage");
});
app.get("/join", (req, res, next) => {
  res.redirect("/registermember");
});
// app.use("/logout", logoutRouter);
app.use("/createProject", createProjectRouter);
app.get("/join", (req, res, next) => {
  res.send("회원가입페이지 get 요청에 대한 프론트 서버 응답입니다.");
});

app.use(express.static(path.join(__dirname, "/")));
app.listen(port, () => {
  console.log("FrontEnd Server is running on port ", port);
});
