import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudent } from '../../../shared/services/studentService';
import DoExam from '../DoExam/DoExam';
const ExamResult = () => {
  const { studentId, examId } = useParams();
  const [student, setStudent] = useState({});
  useEffect(() => {
    getStudent(studentId).then((res) => {
      setStudent(res.data);
    });
  }, [studentId, examId]);
  const rightExam = student.exams
    ? student.exams.find((exam) => exam.exam._id === examId)
    : null;
  console.log('rightExam :>> ', rightExam);
  return (
    <div>
      {student.exams && (
        <>
          <h3> Hello {student.name} </h3>
          <h4>
            {rightExam.grade >= rightExam.exam.passingGrade
              ? rightExam.exam.success
              : rightExam.exam.failure}
          </h4>
          you got {rightExam.rightQuestions} of{' '}
          <span>{rightExam.exam.questions.length} and your grade is</span>{' '}
          <span
            style={{
              color:
                rightExam.grade >= rightExam.exam.passingGrade
                  ? 'green'
                  : 'red',
            }}
          >
            {rightExam.grade}
          </span>
          {rightExam.exam.isShow ? <DoExam review /> : null}
        </>
      )}
    </div>
  );
};

export default ExamResult;
