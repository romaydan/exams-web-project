const mongoose = require('mongoose');
const Joi = require('joi');

const { possibleAnswerSchema } = require('./question');

const answeredQuestionSchema = {
  answers: { type: [possibleAnswerSchema] },
};

const studentExamSchema = new mongoose.Schema({
  exam: { type: { type: [mongoose.Schema.Types.ObjectId], ref: 'Exam' } },
  answeredQuestions: { type: [answeredQuestionSchema] },
  submitted: { type: Boolean },
  submitDate: { type: Date },
  rightQuestions: { type: Number },
  grade: { type: Number }
})

const studentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  exams: { type: [studentExamSchema] },
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(exam) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(50).required(),
    exams: Joi.array(),
  });
  return schema.validate(exam);
}

exports.studentSchema = studentSchema;
exports.Student = Student;
exports.validate = validateStudent;
