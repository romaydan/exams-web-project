const express = require('express');
const mongoose = require('mongoose');

const { Student, validate } = require('../models/student');

const router = express.Router();

router.post('/', async (req, res) => {
  let examId = mongoose.Types.ObjectId(req.body.examId);
  delete req.body.examId;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let student = await Student.findOneAndUpdate(
    { email: req.body.email },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      $push: { exams: { _id: examId } },
    },
    { new: true, upsert: true }
  );
  res.send(student);
});

router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res
      .status(404)
      .send('The question with the given ID was not found.');
  res.send(student);
});

router.put('/exam/:id', async (req, res) => {
  const student = await Student.findById(req.body.studentId);

  let exam = student.exams.find((e) => e._id == req.body.examId);
  let answeredQuestion = exam.answeredQuestions.find(
    (aq) => aq._id == req.body.questionId
  );
  if (answeredQuestion) {
    answeredQuestion.answers = [...req.body.answers];
  } else {
    exam.answeredQuestions = [
      ...exam.answeredQuestions,
      { _id: req.body.questionId, answers: req.body.answers },
    ];
  }
  student.save();
  res.send(student);
  // res.send(query);
  // student.exams.find(exam => exam.exam === req.body.examId)
});
// router.put('/:id', async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const question = await Question.findByIdAndUpdate(
//         req.params.id,
//         {
//             type: req.body.type,
//             text: req.body.text,
//             textBelow: req.body.textBelow,
//             possibleAnswers: req.body.possibleAnswers,
//             answersLayout: req.body.answersLayout,
//             tags: req.body.tags,
//             lastUpdate: Date.now(),
//         },
//         { new: true }
//     );

//     if (!question)
//         return res
//             .status(404)
//             .send('The question with the given ID was not found.');

//     res.send(question);
// });

// router.delete('/:id', async (req, res) => {
//     const question = await Question.findByIdAndRemove(req.params.id);

//     if (!question)
//         return res
//             .status(404)
//             .send('The question with the given ID was not found.');

//     res.send(question);
// });

// router.get('/', async (req, res) => {
//     const questions = await Question.find().select('-__v');

//     res.send(questions);
// });

module.exports = router;
