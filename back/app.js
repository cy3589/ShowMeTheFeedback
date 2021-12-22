require("dotenv").config();
const asyncHandler = require("./utils/asyncHandler");
// library
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const passportStart = require("./passport");
const { sign, refresh } = require("./utils/jwt");
// routes
const apiRouter = require("./routes");

const port = 5000;

const app = express();

passportStart();

app.use(cors());
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

app.get("/", (req, res) => {
  res.render("index");
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
  asyncHandler((req, res) => {
    const accessToken = sign(req.user.userEmail);
    const refreshToken = refresh();
    res.status(200).json({ accessToken, refreshToken });
  })
);

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
