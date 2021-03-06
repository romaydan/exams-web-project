const mongoose = require('mongoose');
const Joi = require('joi');

const { fieldOfStudySchema } = require('./fieldOfStudy');

const examSchema = new mongoose.Schema({
  language: { type: Number },
  name: { type: String },
  passingGrade: { type: Number },
  isShow: { type: Boolean },
  header: { type: String },
  success: { type: String },
  failure: { type: String },
  lastUpdate: { type: Date },
  questions: {
    type: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'Question' }],
  },
  fieldOfStudy: { type: fieldOfStudySchema },
});

const Exam = mongoose.model('Exam', examSchema);

function validateExam(exam) {
  const schema = Joi.object({
    language: Joi.number().min(0).max(1).required(),
    name: Joi.string().min(2).max(200).required(),
    passingGrade: Joi.number().min(54).max(100).required(),
    isShow: Joi.boolean().default(false),
    header: Joi.string().required(),
    success: Joi.string().required(),
    failure: Joi.string().required(),
    questions: Joi.array().required(),
    fieldOfStudy: Joi.object().required()
  });

  return schema.validate(exam);
}

exports.examSchema = examSchema;
exports.Exam = Exam;
exports.validate = validateExam;
