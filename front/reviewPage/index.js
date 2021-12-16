// import "./reviewPage";
// const { Router } = require("express");
// const path = require("path");
// const root = document.getElementById("root");
// root.innerHTML = "12312312";
// import { projectId } from "./reviewPage";
// const { temp } = require("./reviewPage");

// const { Router } = require("express");
// const path = require("path");

// const router = Router();
// let projectId = "";
// router.get("/:projectId", (req, res, next) => {
//   projectId = req.params.projectId;
//   console.log(req.params.projectId);
//   res.sendFile(path.join(__dirname + "/", "index.html"));
//   // res.sendFile(path.join(__dirname + "/", "index.js"));
//   //   res.end("123");
// });

// module.exports = router;
// // exports.projectId;
// exports.temp = "temp";
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};
const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("Viewing Dashboard") },
    { path: "/posts", view: () => console.log("Viewing Posts") },
    { path: "/settings", view: () => console.log("Viewing Settings") },
  ];
  (routes.find((v) => location.pathname === v.path) || routes[0]).view();
};
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById(
    "root"
  ).innerHTML += `<div>${location.pathname}</div>`;
});
console.log(location.pathname.match(/\w+/g)[1]);

