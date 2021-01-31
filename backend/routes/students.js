const express = require('express');

const { Student, validate } = require('../models/student');
const { Exam } = require('../models/exam');
const { Question } = require('../models/question');
const { ExamInstance } = require('../models/examInstance');

const router = express.Router();

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.post('/', async (req, res) => {
  let examId = req.body.examId;
  delete req.body.examId;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let student = await Student.findOneAndUpdate(
    { email: req.body.email },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    },
    { new: true, upsert: true }
  )
  const studentExam = student.exams.filter((ex) => ex._id == examId);
  if (studentExam.length < 1) {

    student.exams = [...student.exams, { exam: examId }];
  } else if (studentExam[0].submitted) {
    res.status(400).send(student._id);
  }
  res.send(student);
  student.save();
});

router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id).populate({
    path: 'exams.exam', populate: {
      path: 'questions'
    }
  }).populate('exams.answeredQuestions.question')
  if (!student)
    return res.status(404).send('The student with the given ID was not found.');
  res.send(student);
});

router.put('/exam/:id', async (req, res) => {
  const student = await Student.findById(req.body.studentId);

  saveAnswersAndGetStudExam(
    student,
    req.body.examId,
    req.body.questionId,
    req.body.answers
  );
  student.save();
  res.send(student);
});

router.put('/submit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id).populate('exams.answeredQuestions.question');
  let studentExam = saveAnswersAndGetStudExam(student, req.body.examId, req.body.questionId, req.body.answers);
  studentExam.submitDate = Date.now();
  if (studentExam.submitted) { return res.status(400).send('student already submitted') }
  studentExam.submitted = true
  let fullExam = await Exam.findById(req.body.examId);
  let grade = 0
  let rightQuetionsCounter = 0;
  const questionPoints = 100 / fullExam.questions.length;
  for (let answeredQuestion of studentExam.answeredQuestions) {
    let points = 0;
    let fullQuestion = answeredQuestion.question;
    if (answeredQuestion.question.type === 0) {
      if (answeredQuestion.answers[0].isCorrect) {
        points = questionPoints;
        rightQuetionsCounter++;
      }
    }
    else if (fullQuestion.type === 1) {
      let correctAnsCountInFull = fullQuestion.possibleAnswers.filter(ans => ans.isCorrect).length
      let correctAnsCountInExam = answeredQuestion.answers.filter(ans => ans.isCorrect).length;
      let wrongAnswersCount = answeredQuestion.answers.length - correctAnsCountInExam
      let pointsToAdd = questionPoints * (correctAnsCountInExam / correctAnsCountInFull)
      let pointsToSubstract = questionPoints * ((wrongAnswersCount) / correctAnsCountInFull)
      points = pointsToAdd - pointsToSubstract
      if (correctAnsCountInFull === correctAnsCountInExam) {
        rightQuetionsCounter++;
      }
    }
    if (points > 0)
      grade += points;
  }
  studentExam.grade = Math.round(grade);
  studentExam.rightQuestions = rightQuetionsCounter;
  student.save();
  res.sendStatus(200);
});

function saveAnswersAndGetStudExam(student, examId, questionId, answers) {
  const studentExam = student.exams.find((e) => e.exam._id == examId);
  const answeredQuestion = studentExam.answeredQuestions.find(
    (aq) => aq.question._id == questionId
  );
  if (answeredQuestion) {
    answeredQuestion.answers = [...answers];
  } else {
    studentExam.answeredQuestions = [
      ...studentExam.answeredQuestions,
      { question: questionId, answers: answers },
    ];
  }
  return studentExam;
}

module.exports = router;
