import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ExamQuestion from '../../components/ExamQuestion/ExamQuestion2';
import { getExam } from '../../../shared/services/examService';
import {
  getStudent,
  saveStudentQuestion,
} from '../../../shared/services/studentService';
const DoExam = () => {
  const lastQuestion = useRef('Next');
  let { studentId, examId } = useParams();
  const [exam, setExam] = useState({});
  const [student, setStudent] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    getStudent(studentId).then((res) => {
      setStudent(res.data);
    });
    getExam(examId).then((res) => {
      setExam({ ...res.data });
    });
  }, [studentId, examId]);

  useEffect(() => {
    if (exam.questions && questionIndex + 1 === exam.questions.length) {
      lastQuestion.current = 'End Test';
    } else {
      lastQuestion.current = 'Next';
    }
  }, [questionIndex, exam.questions]);

  const nextQuestionHandler = () => {
    saveStudentQuestion(
      exam.questions[questionIndex]._id,
      studentId,
      examId,
      answers
    ).then((res) => {
      console.log('res', res);
      if (lastQuestion.current === 'End Test') {
        console.log('test submit');
      } else {
        setQuestionIndex((prevState) => prevState + 1);
      }
    });
  };

  const prevQuestionHandler = () => {
    setQuestionIndex((prevState) => prevState - 1);
  };

  const answerSelectedHandler = (answer) => {
    if (exam.questions[questionIndex].type === 0) {
      setAnswers([answer]);
    } else
      setAnswers((prev) => {
        return prev.filter((ans) => ans._id === answer._id).length === 1
          ? prev.filter((ans) => ans._id !== answer._id)
          : [...prev, answer];
      });
  };
  const findAnsweredQuestions = () => {
    let rightExam = student.exams.find((exam) => exam._id == examId);
    answers = rightExam.answeredQuestions.find(
      (aq) => aq._id == exam[questionIndex]._id
    );
  };

  return (
    <div>
      <h3>hello {student.firstName}</h3>
      {exam.questions && (
        <ExamQuestion
          // selectedAnswers={findAnsweredQuestions()}
          answerSelected={answerSelectedHandler}
          question={exam.questions[questionIndex]}
        />
      )}
      <button disabled={questionIndex <= 0} onClick={prevQuestionHandler}>
        Prev
      </button>
      <button onClick={nextQuestionHandler}>{lastQuestion.current}</button>
    </div>
  );
};

export default DoExam;
