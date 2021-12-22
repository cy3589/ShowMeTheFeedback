const express = require("express");
const path = require("path");

const port = 443;

const app = express();
app.use("/", express.static("indexPage"));

app.use(express.static(path.join(__dirname, "/")));

app.listen(port, () => {
  console.log("FrontEnd Server is running on port ", port);
});
