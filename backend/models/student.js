const mongoose = require('mongoose');
const { questionSchema } = require('./question');

const Joi = require('joi');

const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: Boolean },
    registerDate: { type: Date },
    Answers: { type: [exam] }
});

const Student = mongoose.model('Student', studentSchema);

function validateExam(exam) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(8).max(40).required(),
        phone: Joi.string().min(9).max(15).required(),
        registerDate: Joi.date()

    });
    return schema.validate(exam);
}

exports.examSchema = studentSchema;
exports.Student = Student;
exports.validate = validateExam;
