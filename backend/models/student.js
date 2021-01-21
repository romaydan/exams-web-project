const mongoose = require('mongoose');
const { possibleAnswerSchema } = require('./question');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  answers: { type: [possibleAnswerSchema] },
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(exam) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(5).max(50).required(),
    answers: Joi.array(),
  });

  return schema.validate(exam);
}

exports.studentSchema = studentSchema;
exports.Student = Student;
exports.validate = validateStudent;
