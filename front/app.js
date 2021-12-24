const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const reviewPageRouter = require("./reviewPage/reviewPageRouter.js");
const projectsRouter = require("./Projects/projectsRouter.js");
const port = 80;

const app = express();

app.use("/", express.static("indexPage"));
app.use("/reviewPage", reviewPageRouter);
app.use("/Projects", projectsRouter);
app.use(express.static(path.join(__dirname, "/")));

app.listen(port, () => {
  console.log("FrontEnd Server is running on port ", port);
});
