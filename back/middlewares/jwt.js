const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    const user = await User.findOne({ token: req.token });
    if (!user) {
      res.status(401);
      throw new Error('토큰이 유효하지 않습니다.');
    } else {
      res.json({
        status: 200,
      });
    }
    next();
  } else {
    res.send(403);
  }
};

// 유효한 토큰인지 확인하는 과정을 추가합니다.
