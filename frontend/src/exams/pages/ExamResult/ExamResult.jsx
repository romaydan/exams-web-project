import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExam } from '../../../shared/services/examService';
import { getStudent } from '../../../shared/services/studentService';
const ExamResult = () => {
  const { studentId, examId } = useParams();
  const [student, setStudent] = useState({});
  const [exam, setExam] = useState({});
  useEffect(() => {
    getStudent(studentId).then((res) => {
      setStudent(res.data);
    });
    getExam(examId).then((res) => {
      setExam(res.data);
    });
  }, [studentId, examId]);

  return (
    <div>
      {student.exams && exam.questions && (
        <>
          <h3> Hello {student.name} </h3>
          <h4>
            {student.exams.find((exam) => exam._id === examId).grade >=
            exam.passingGrade
              ? exam.success
              : exam.failure}
          </h4>
          you got{' '}
          {student.exams.find((exam) => exam._id === examId).rightQuestions} of{' '}
          <span>{exam.questions.length} and your grade is</span>
          <span
            style={{
              color:
                student.exams.find((exam) => exam._id === examId).grade >=
                exam.passingGrade
                  ? 'green'
                  : 'red',
            }}
          >
            {student.exams.find((exam) => exam._id === examId).grade}
          </span>
        </>
      )}
    </div>
  );
};

export default ExamResult;
