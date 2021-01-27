const express = require('express');

const { Student, validate } = require('../models/student');
const { Exam } = require('../models/exam');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const questions = await Question.find().select('-__v');

//     res.send(questions);
// });

router.post('/', async (req, res) => {
  let examId = req.body.examId;
  delete req.body.examId;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.textBelow,
    phone: req.body.possibleAnswers,
    registerDate: Date.now(),
  });

  Exam.findOneAndUpdate({ _id: examId }, { $push: { students: student } });

  await student.save();

  res.send(student);
});
router.post('/save', async (req, res) => {
  const student = await Student.findOneAndUpdate(req.body.StudentId, {});
});
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res
      .status(404)
      .send('The question with the given ID was not found.');

  res.send(student);
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

module.exports = router;
