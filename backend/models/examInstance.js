const mongoose = require('mongoose');

const { possibleAnswerSchema } = require('./question');

const answeredQuestionSchema = {
  question: { type: mongoose.Schema.ObjectId, ref: 'Question' },
  answers: { type: [possibleAnswerSchema] },
};

const examInstanceSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  answeredQuestions: { type: [answeredQuestionSchema] },
  submitted: { type: Boolean },
  submitDate: { type: Date },
  rightQuestions: { type: Number },
  grade: { type: Number },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

const ExamInstance = mongoose.model('ExamInstance', examInstanceSchema);

exports.examInstanceSchema = examInstanceSchema;
exports.ExamInstance = ExamInstance;
