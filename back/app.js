const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const projectRouter = require("./routes/project");

require("dotenv").config();

const port = 3000;

const app = express();

mongoose.connect(process.env.mongoURL, (err) => {
  if (err) {
    console.log("연결에 실패했습니다.");
    console.log(err);
  } else console.log("연결완료");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
