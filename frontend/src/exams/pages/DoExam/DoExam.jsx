import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExamQuestion from '../../components/ExamQuestion/ExamQuestion2';
import { getExam } from '../../../shared/services/examService';
import {
  getStudent,
  saveStudentQuestion,
} from '../../../shared/services/studentService';
const DoExam = () => {
  let { studentId, examId } = useParams();
  const [exam, setExam] = useState({});
  const [student, setStudent] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    console.log('exam');
    getExam(examId).then((res) => {
      setExam({ ...res.data });
    });
    getStudent(studentId).then((res) => {
      setStudent(res.data);
    });
  }, [studentId, examId]);

  useEffect(() => {
    console.log('answers', answers);
  }, [answers]);
  const nextQuestionHandler = () => {
    saveStudentQuestion(exam[questionIndex]._id, studentId, answers);
    setQuestionIndex((prevState) => prevState + 1);
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
  return (
    <div>
      <h3>hello {student.firstName}</h3>
      <ExamQuestion
        answerSelected={answerSelectedHandler}
        question={exam.questions ? exam.questions[questionIndex] : null}
      />
      <button disabled={questionIndex <= 0} onClick={prevQuestionHandler}>
        Prev
      </button>
      <button
        disabled={exam.questions && questionIndex + 1 === exam.questions.length}
        onClick={nextQuestionHandler}
      >
        Next
      </button>
    </div>
  );
};

export default DoExam;
