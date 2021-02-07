import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { shuffle } from 'lodash';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ExamQuestion from '../../components/ExamQuestion/ExamQuestion';

import {
  getStudent,
  saveStudentQuestion,
  submitStudentExam,
} from '../../../shared/services/studentService';

const StudentExam = (props) => {
  const { isReview } = props;
  const history = useHistory();
  let { studentId, examId } = useParams();

  const [exam, setExam] = useState({});
  const [student, setStudent] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(isReview ? 0 : -1);

  const answers = useRef([]);

  useEffect(() => {
    getStudent(studentId, examId)
      .catch((error) => toast.error('something went wrong'))
      .then((res) => {
        setStudent(res.data);

        const correctExam = res.data.exams.find((ex) => ex.exam._id === examId)
          .exam;
        correctExam.question = shuffle(correctExam.question);
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
    if (questionIndex >= 0) {
      saveStudentQuestion(
        exam.questions[questionIndex]._id,
        studentId,
        examId,
        answers.current
      )
        .catch((error) => toast.error('something went wrong'))
        .then(() => {
          if (questionIndex + 1 === exam.questions.length) {
            setShowModal(true);
          } else {
            setQuestionIndex((prevState) => prevState + 1);
          }
        });
    } else setQuestionIndex((prevState) => prevState + 1);
  };
  const prevQuestionHandler = () => {
    if (questionIndex >= 0)
      saveStudentQuestion(
        exam.questions[questionIndex]._id,
        studentId,
        examId,
        answers.current
      ).catch((error) => toast.error('something went wrong'));
    setQuestionIndex((prevState) => prevState - 1);
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
    if (questionIndex >= 0 && student.exams) {
      let rightExam = student.exams.find(
        (studentExam) => studentExam.exam._id === examId
      );
      let ret = rightExam.answeredQuestions.find(
        (aq) => aq.question._id === exam.questions[questionIndex]._id
      );
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
      {questionIndex >= 0 ? (
        exam.questions && (
          <ExamQuestion
            review={isReview}
            selectedAnswers={findAnsweredQuestions()}
            answerSelected={answerSelectedHandler}
            question={exam.questions[questionIndex]}
          />
        )
      ) : (
        <h3>{exam.header}</h3>
      )}
      <button
        disabled={questionIndex <= -1}
        className='btn btn-info'
        onClick={
          isReview
            ? () => setQuestionIndex((prev) => prev - 1)
            : prevQuestionHandler
        }
      >
        {'<< Prev Question'}
      </button>
      <button
        className='btn btn-primary'
        onClick={
          isReview
            ? () => setQuestionIndex((prev) => prev + 1)
            : nextQuestionHandler
        }
        style={{
          display:
            exam.questions &&
            questionIndex + 1 === exam.questions.length &&
            isReview
              ? 'none'
              : 'inline-block',
        }}
      >
        {exam.questions && questionIndex + 1 === exam.questions.length
          ? 'Submit The Test!'
          : 'Next Question >>'}
      </button>
      <h5>
        Question {questionIndex + 1} of{' '}
        {exam.questions && exam.questions.length}
      </h5>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>submit Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to submit the exam?</Modal.Body>
        <Modal.Footer>
          <button onClick={sumbitExamHandler} className='btn btn-primary'>
            Yes
          </button>
          <button
            className='btn btn-danger'
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
StudentExam.propTypes = {
  review: PropTypes.bool,
};
export default StudentExam;
