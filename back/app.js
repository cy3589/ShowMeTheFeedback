require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const projectRouter = require("./routes/project");
const authRouter = require("./routes/auth");
const refreshRouter = require("./routes/refresh");
const checkUserAccess = require("./middlewares/check-user-JWT");
const commentRouter = require("./routes/comment");

const port = 3000;

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(port);
    console.log("connected");
  })
  .catch((err) => console.log(err));

// routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/users", checkUserAccess, userRouter);
app.use("/projects", projectRouter); // TODO: 미들웨어 연결!!!
app.use("/comments", commentRouter); // TODO: 미들웨어 연결!!!

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
