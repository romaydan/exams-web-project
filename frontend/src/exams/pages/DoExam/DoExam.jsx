import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { shuffle } from 'lodash';

import ExamQuestion from '../../components/ExamQuestion/ExamQuestion';
import Modal from '../../../shared/components/UIElements/Modal';

import {
  getStudent,
  saveStudentQuestion,
  submitStudentExam,
} from '../../../shared/services/studentService';

import classes from './DoExam.module.css';

const DoExam = () => {
  const history = useHistory();
  let { studentId, examId } = useParams();
  const [exam, setExam] = useState({});
  const [student, setStudent] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const answers = useRef([]);
  useEffect(() => {
    getStudent(studentId, examId).then((res) => {
      console.log('res.data in student :>> ', res.data);
      setStudent(res.data);
      const correctExam = res.data.exams.find((ex) => ex.exam._id === examId)
        .exam;
      console.log('correctExam :>> ', correctExam);

      setExam(correctExam);
    });
  }, [studentId, examId, questionIndex]);

  useEffect(() => {
    if (exam.questions) {
      let selectedAns = findAnsweredQuestions();
      if (selectedAns) answers.current = selectedAns.answers;
      else {
        answers.current = [];
      }
    }
  }, [questionIndex, exam.questions]);

  const nextQuestionHandler = () => {
    saveStudentQuestion(
      exam.questions[questionIndex]._id,
      studentId,
      examId,
      answers.current
    ).then(() => {
      if (questionIndex + 1 === exam.questions.length) {
        setShowModal(true);
      } else {
        setQuestionIndex((prevState) => prevState + 1);
      }
    });
  };

  const prevQuestionHandler = () => {
    saveStudentQuestion(
      exam.questions[questionIndex]._id,
      studentId,
      examId,
      answers.current
    ).then((res) => {
      setQuestionIndex((prevState) => prevState - 1);
    });
  };

  const answerSelectedHandler = (answer) => {
    if (exam.questions[questionIndex].type === 0) {
      answers.current = [answer];
    } else
      answers.current =
        answers.current.filter((ans) => ans._id === answer._id).length === 1
          ? answers.current.filter((ans) => ans._id !== answer._id)
          : [...answers.current, answer];
  };
  const findAnsweredQuestions = () => {
    if (student.exams) {
      let rightExam = student.exams.find(
        (studentExam) => studentExam.exam._id === examId
      );
      console.log('rightExam', rightExam);
      console.log('exam :>> ', exam);
      const ret = rightExam.answeredQuestions.find(
        (aq) => aq.question._id === exam.questions[questionIndex]._id
      );
      console.log('ret', ret);
      return ret;
    }
  };

  const sumbitExamHandler = () => {
    submitStudentExam(
      exam.questions[questionIndex]._id,
      studentId,
      examId,
      answers.current
    )
      .then(() => {
        history.push(`${studentId}/result`);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  return (
    <>
      <h3>hello {student.firstName}</h3>
      {exam.questions && (
        <ExamQuestion
          selectedAnswers={findAnsweredQuestions()}
          answerSelected={answerSelectedHandler}
          question={exam.questions[questionIndex]}
        />
      )}
      <button disabled={questionIndex <= 0} onClick={prevQuestionHandler}>
        Prev
      </button>
      <button onClick={nextQuestionHandler}>
        {exam.questions && questionIndex + 1 === exam.questions.length
          ? 'End Test'
          : 'Next'}
      </button>
      <h5>
        Question {questionIndex + 1} of{' '}
        {exam.questions && exam.questions.length}
      </h5>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <h5 style={{ textAlign: 'center' }}>
          Would you like to submit the exam?
        </h5>
        <div className={classes.ModalButtons}>
          <button onClick={sumbitExamHandler} className='btn btn-primary'>
            Yes
          </button>
          <button
            className='btn btn-danger'
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DoExam;
