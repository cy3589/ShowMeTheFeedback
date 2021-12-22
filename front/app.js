const express = require("express");
const path = require("path");
// const project = require("/project");
// const loginRouter = require("./loginPage/loginRouter.js");
// const logoutRouter = require("./logoutPage/logoutRouter.js");
const cookieParser = require("cookie-parser");
// const projectRouter = 11;
const port = 5500;

const app = express();
// app.use("/", indexRouter);
// app.use(cookieParser());

app.use("/", express.static("indexPage"));
// app.use("/reviewPage/static", (req, res, next) => {
//   console.log(path.join(__dirname, "/reviewPage/static/index.html"));
//   res.render(path.join(__dirname, "/reviewPage/static/index.html"));
//   // res.contentType(path.basename("/index.html"));
//   // res.send("adsfafs");
// });

// app.use("/reviewPage/static/*", express.static("reviewPage/static"));

const reviewPageRouter = require("./reviewPage/reviewPageRouter.js");
app.use("/reviewPage/static", reviewPageRouter);

app.use(express.static(path.join(__dirname, "/")));
app.listen(port, () => {
  console.log("FrontEnd Server is running on port ", port);
});
