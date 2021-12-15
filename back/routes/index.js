const { Router } = require('express');

const router = Router();
const { auth } = require('../public/auth');

router.get('/', (req, res) => {
  res.json({
    status: 200,
  });
});

router.get('/login', (req, res) => {
  res.json({
    status: 200,
  });
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = auth(email, password);

  res.json({
    status: 200,
    token,
  });
});

router.get('/register', (req, res) => {
  res.json({
    status: 200,
  });
});

router.post('/register', (req, res) => {
  res.json({
    status: 200,
  });
});

module.exports = router;
