const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log('DATABASE CONNECTION DONE');
    return app.listen(process.env.PORT);
  })
  .then(() => {
    console.log('SERVER RUNNING');
  })
  .catch((err) => {
    console.log(err);
  });