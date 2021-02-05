const express = require('express');

const { ExamInstance } = require('../models/examInstance');

const router = express.Router();

router.get('/', async (req, res) => {
  const exam = JSON.parse(req.query.exam);
  const dateRange = JSON.parse(req.query.dateRange);

  const examInstances = await ExamInstance.find({
    exam: exam,
    submitDate: { $gte: dateRange.startDate, $lte: dateRange.endDate },
  }).populate('student');

  if (examInstances.length === 0)
    return res
      .status(404)
      .send(
        'The exam instances with the given exam and date range was not found.'
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
