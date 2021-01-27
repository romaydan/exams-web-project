const express = require('express');

const auth = require('../middleware/auth');
const { Question, validate } = require('../models/question');

const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.find({ fieldsOfStudy: req.query });

  res.send(questions);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = new Question({
    type: req.body.type,
    text: req.body.text,
    textBelow: req.body.textBelow,
    possibleAnswers: req.body.possibleAnswers,
    answersLayout: req.body.answersLayout,
    tags: req.body.tags.split(', '),
    lastUpdate: Date.now(),
    numberOfTests: 0,
    fieldsOfStudy: req.body.fieldsOfStudy,
  });
  await question.save();

  res.send(question);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
      text: req.body.text,
      textBelow: req.body.textBelow,
      possibleAnswers: req.body.possibleAnswers,
      answersLayout: req.body.answersLayout,
      tags: req.body.tags.split(', '),
      lastUpdate: Date.now(),
      numberOfTests: req.body.numberOfTests,
      fieldsOfStudy: req.body.fieldsOfStudy,
    },
    { new: true }
  );

  if (!question)
    return res
      .status(404)
      .send('The question with the given ID was not found.');

  res.send(question);
});

router.delete('/:id', auth, async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);

  if (!question)
    return res
      .status(404)
      .send('The question with the given ID was not found.');

  res.send(question);
});

router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question)
    return res
      .status(404)
      .send('The question with the given ID was not found.');

  res.send(question);
});

module.exports = router;
