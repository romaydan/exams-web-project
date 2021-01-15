const { Exam, validate } = require('../models/exam');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const exams = await Exam.find().select('-__v');

    res.send(exams);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const exam = new Exam({
        language: req.body.language,
        name: req.body.name,
        header: req.body.header,
        success: req.body.successMessage,
        fail: req.body.failMessage,
        questions: req.body.questions
    });
    await question.save();

    res.send(question);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const exam = await Question.findByIdAndUpdate(
        req.params.id,
        {
            language: req.body.language,
            name: req.body.name,
            header: req.body.header,
            success: req.body.successMessage,
            fail: req.body.failMessage,
            questions: req.body.questions
        },
        { new: true }
    );

    if (!exam)
        return res
            .status(404)
            .send('The exam with the given ID was not found.');

    res.send(question);
});

router.delete('/:id', async (req, res) => {
    const exam = await Exam.findByIdAndRemove(req.params.id);

    if (!exam)
        return res
            .status(404)
            .send('The exam with the given ID was not found.');

    res.send(exam);
});

router.get('/:id', async (req, res) => {
    const exam = await Exam.findById(req.params.id);

    if (!exam)
        return res
            .status(404)
            .send('The exam with the given ID was not found.');

    res.send(exam);
});

module.exports = router;
