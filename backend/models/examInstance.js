const mongoose = require('mongoose');

const { possibleAnswerSchema } = require('./question');

const answeredQuestionSchema = {
  answers: { type: [possibleAnswerSchema] },
};

const examInstanceSchema = new mongoose.Schema({
  answeredQuestions: { type: [answeredQuestionSchema] },
  submitted: { type: Boolean },
  submitDate: { type: Date },
  rightQuestions: { type: Number },
  grade: { type: Number },
});

const ExamInstance = mongoose.model('ExamInstance', examInstanceSchema);

exports.examInstanceSchema = examInstanceSchema;
exports.ExamInstance = ExamInstance;
