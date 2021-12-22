require("dotenv").config();
// library
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
// routes
const apiRouter = require("./routes");

const port = 3000;

const app = express();

const passportStart = require("./passport");
passportStart();

app.use(cors({ origin: "http://localhost:5000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(port);
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use(passport.initialize());

// routes
// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// }); // 헤더 설정

app.get("/", (req, res) => {
  res.send("Hello~!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    console.log(req.user._json.email);
    res.render("success.ejs");
  }
);

app.get("/succ", (req, res) => {
  res.render("success.ejs");
});

app.get("/fail", (req, res) => {
  res.render("goo.ejs");
});

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
