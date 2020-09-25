const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const likesRoutes = require('./router/scrape');

app.use('/', likesRoutes);

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
