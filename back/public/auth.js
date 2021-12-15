const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports = userLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('가입되지 않은 이메일입니다.');
  }

  if (!bcrypt.compare(password, user.password)) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  // TODO: jwt 토큰
  const token = jwt.sign(
    {
      exp: 1000 * 60 * 60 * 24,
      data: {
        email,
        password,
      },
    },
    'secret'
  );

  return token;
};
