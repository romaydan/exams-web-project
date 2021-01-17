const express = require('express');
const questions = require('../routes/questions');
const exams = require('../routes/exams');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/questions', questions);
  app.use('/api/exams', exams);
  app.use(error);
};
