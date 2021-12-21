require("dotenv").config();
// library
const express = require("express");
const mongoose = require("mongoose");

// routes
const apiRouter = require("./routes");

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
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});
