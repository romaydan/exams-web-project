const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
