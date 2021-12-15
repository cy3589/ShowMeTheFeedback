const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const projectRouter = require('./routes/project');

require('dotenv').config();

const port = 3000;

const app = express();

// database connection
mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(port);
    console.log('connected');
  })
  .catch((err) => console.log(err));

// routes
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);
