const express = require("express");
const path = require("path");
const projectsRouter = require("./Projects/projectsRouter.js");
// const project = require("/project");
const loginPage = require("./loginPage");
const indexRouter = require("./indexPage/indexRouter.js");
const projectRouter = 11;
const port = 5000;

const app = express();

app.use(express.static(path.join(__dirname, "/")));
// app.use("/reviewPage", reviewPage);
app.use("/projects", projectsRouter);
// app.use("/project",project)
app.use("/login", loginPage);
app.use("/", indexRouter);

app.listen(port, () => {
  console.log("FrontEnd Server is running on port ", port);
});
