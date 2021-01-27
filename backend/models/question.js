const mongoose = require('mongoose');
const Joi = require('joi');

const { fieldOfStudySchema } = require('./fieldOfStudy');

const possibleAnswerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  text: {
    type: String,
    required: true,
  },
  textBelow: {
    type: String,
    required: false,
  },
  possibleAnswers: { type: [possibleAnswerSchema] },
  answersLayout: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  tags: {
    type: [String],
    required: true,
  },
  lastUpdate: { type: Date },
  numberOfTests: {
    type: Number,
    min: 0,
  },
  fieldsOfStudy: { type: [fieldOfStudySchema] },
});

const Question = mongoose.model('Question', questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    type: Joi.number().min(0).max(1).required(),
    text: Joi.string().required(),
    textBelow: Joi.string().allow(''),
    possibleAnswers: Joi.array()
      .items(
        Joi.object({
          answer: Joi.string().required(),
          isCorrect: Joi.boolean().default(false),
        })
      )
      .required(),
    answersLayout: Joi.number().min(0).max(1).required(),
    tags: Joi.string().required(),
    lastUpdate: Joi.date(),
    numberOfTests: Joi.number().min(0),
    fieldsOfStudy: Joi.array(),
  });

  return schema.validate(question);
}

exports.possibleAnswerSchema = possibleAnswerSchema;
exports.questionSchema = questionSchema;
exports.Question = Question;
exports.validate = validateQuestion;
