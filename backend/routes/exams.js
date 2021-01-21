const { Exam, validate } = require('../models/exam');
const { Question } = require('../models/question');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const exams = await Exam.find().populate('questions');

  res.send(exams);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const questions = await Question.find({ _id: { $in: req.body.questions } });
  if (!questions) return res.status(400).send('Invalid questions.');

  const exam = new Exam({
    language: req.body.language,
    name: req.body.name,
    header: req.body.header,
    success: req.body.success,
    failure: req.body.failure,
    isShow: req.body.isShow,
    passingGrade: req.body.passingGrade,
    lastUpdate: Date.now(),
    questions: req.body.questions,
  });
  await exam.save();

  questions.forEach((question) => {
    question.numberOfTests++;
    question.save();
  });

  res.send(exam);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body.exams);
  if (error) return res.status(400).send(error.details[0].message);

  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      language: req.body.language,
      name: req.body.name,
      header: req.body.header,
      success: req.body.successMessage,
      fail: req.body.failMessage,
      lastUpdate: Date.now(),
      questions: req.body.questions,
    },
    { new: true }
  );

  if (!exam)
    return res.status(404).send('The exam with the given ID was not found.');

  res.send(exam);
});

router.delete('/:id', async (req, res) => {
  const exam = await Exam.findByIdAndRemove(req.params.id);

  if (!exam)
    return res.status(404).send('The exam with the given ID was not found.');

  res.send(exam);
});

router.get('/:id', async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate('questions');

  if (!exam)
    return res.status(404).send('The exam with the given ID was not found.');

  res.send(exam);
});

module.exports = router;
