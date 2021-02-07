import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getStudent } from '../../../shared/services/studentService';
import StudentExam from '../StudentExam/StudentExam';

const StudentExamResult = () => {
  const { studentId, examId } = useParams();
  const [student, setStudent] = useState({});

  useEffect(() => {
    getStudent(studentId)
      .catch((error) => toast.error('something went wrong'))
      .then((res) => {
        setStudent(res.data);
      });
  }, [studentId, examId]);
  const rightExam = student.exams
    ? student.exams.find((exam) => exam.exam._id === examId)
    : null;

  return (
    <div>
      {student.exams && (
        <>
          <h3> Hi {student.name} </h3>
          <h4>
            {rightExam.grade >= rightExam.exam.passingGrade
              ? rightExam.exam.success
              : rightExam.exam.failure}
          </h4>
          <h4>
            you got {rightExam.rightQuestions} of{' '}
            <span>
              {rightExam.exam.questions.length} questions right and your grade
              is
            </span>{' '}
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
          </h4>
          {rightExam.exam.isShow ? <StudentExam isReview /> : null}
        </>
      )}
    </div>
  );
};

export default StudentExamResult;
