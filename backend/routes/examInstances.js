const express = require('express');

const { ExamInstance } = require('../models/examInstance');

const router = express.Router();

router.get('/', async (req, res) => {
  const examInstances = await ExamInstance.find({ exam: req.query }).populate(
    'student'
  );

  res.send(examInstances);
});

router.get('/:id', async (req, res) => {
  const examInstance = await ExamInstance.findById(req.params.id)
    .populate('exam')
    .populate('student')
    .populate('answeredQuestions.question');

  if (!examInstance)
    return res
      .status(404)
      .send('The exam instance with the given ID was not found.');

  res.send(examInstance);
});

module.exports = router;
