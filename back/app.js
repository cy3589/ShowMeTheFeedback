const express = require("express");
const app = express();
const path = require("path");
const api = require("./api");
const cors = require("cors");
const bodyParser = require("body-parser");
// const api =
const port = 8080;
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello Express!!");
});
app.use("/api", api);
app.listen(port, () => {
  console.log("BackEnd Server is runing on port ", port);
});
