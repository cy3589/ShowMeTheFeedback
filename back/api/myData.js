const { Router } = require("express");
const router = Router();
const getDate = (date) => {
  // dateString을 얻기위한 임시 함수
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  return dateString;
};

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
router.get("/:lastId", async (req, res, next) => {
  console.log(req.params.lastId);
  const resData = [];
  for (let i = 0; i < 10; i++) {
    resData.push({
      Title: `타이틀${i}`,
      Image: `https://media.discordapp.net/attachments/919476237720772628/920238099198525470/unknown.png?width=722&height=663`,
      Rating: `${Math.ceil(Math.random() * 5).toString()}`, // 평균 평점, 더미는 1~5의 값을 랜덤으로 생성
      ProjectId: `${parseInt(Math.random() * 100000000000000, 10).toString()}`, // project의 고유ID, 랜덤값으로 생성
      createdAt: getDate(new Date()), // createdAt, 더미는 현재날짜로 생성
      Avatar: Math.random() > 0.5 ? `https://joeschmoe.io/api/v1/random` : "",
      Author: Math.random().toString(36).substr(2, 11),
    });
  }
  await wait(1000);
  res.json(resData);
});

module.exports = router;
