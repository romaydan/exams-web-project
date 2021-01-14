const { Question, validate } = require('../models/question');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.find().select('-__v');

  res.send(questions);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = new Question({
    type: req.body.type,
    text: req.body.text,
    textBelow: req.body.textBelow,
    possibleAnswers: req.body.possibleAnswers,
    answersLayout: req.body.answersLayout,
    tags: req.body.tags,
  });
  await question.save();

  res.send(question);
});

module.exports = router;
