const mongoose = require('mongoose');
const Joi = require('joi');

const answerSchema = new mongoose.Schema({
  answer: { type: String },
  isCorrect: { type: Boolean },
});

const questionSchema = new mongoose.Schema({
  type: { type: Number },
  text: { type: String },
  textBelow: { type: String },
  possibleAnswers: { type: [answerSchema] },
  answersLayout: { type: Number },
  tags: { type: [String] },
  lastUpdate: { type: Date },
});

const Question = mongoose.model('Question', questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    type: Joi.number().min(0).max(1).required(),
    text: Joi.string().required(),
    textBelow: Joi.string(),
    possibleAnswers: Joi.array()
      .items(
        Joi.object({
          answer: Joi.string().required(),
          isCorrect: Joi.boolean().default(false),
        })
      )
      .required(),
    answersLayout: Joi.number().min(0).max(1).required(),
    tags: Joi.array().items(Joi.string()),
  });

  return schema.validate(question);
}

exports.questionSchema = questionSchema;
exports.Question = Question;
exports.validate = validateQuestion;
