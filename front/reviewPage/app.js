const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { nextTick } = require("process");
const port = 9999;

app.use(express.static(`${__dirname}`));
app.use(bodyParser.json());

const user = [
  {
    id: 2356,
    date: "2019.11.28 11:24:19",
    teamName: "개쩌는 팀",
    projectName: "개쩌는 프로젝트",
    mainFunc: "쓰레기를 나무로 바꾸는 기능",
    skills: "java, c, c++, c#",
    member: [
      { name: "김덕배", job: "프론트", task: "잠자기" },
      { name: "김춘자", job: "백엔드", task: "눕기" },
      { name: "이옥자", job: "백엔드", task: "졸기" },
    ],
    teamDiscribe: "",
    thumbnails: [],
    postThumbnailsData: [],
  },
  {
    id: 2344,
    date: "2019.11.28 11:24:19",
    teamName: "쩌는 팀",
    projectName: "쩌는 프로젝트",
    mainFunc: "나무를 쓰레기로 바꾸는 기능",
    skills: "java, c, c++, c#",
    member: [
      { name: "김배덕", job: "프론트", task: "잠자기" },
      { name: "김자춘", job: "백엔드", task: "눕기" },
      { name: "이자옥", job: "백엔드", task: "졸기" },
    ],
    teamDiscribe: "",
    thumbnails: [],
    postThumbnailsData: [],
  },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(port, () => {
  console.log("server is running");
});
