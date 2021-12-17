const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const projectRouter = require("./routes/project");
const authRouter = require("./routes/auth");
const jwtMiddleware = require("./middlewares/jwt");
const commentRouter = require("./routes/comment");

require("dotenv").config();

const port = 3000;

const app = express();

app.use(express.json());

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
app.use("/users", jwtMiddleware, userRouter);
app.use("/projects", projectRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
