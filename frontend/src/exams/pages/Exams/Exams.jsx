import React, { useState, useEffect } from 'react';
import { getExams } from '../../../shared/services/examService';
const Exams = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    getExams()
      .then((res) => setExams(res.data))
      .catch((error) => {
        console.log('error!', error);
      });
  }, []);
  const changeExamHandler = (exam) => {};
  const examsElms = exams.map((exam) => (
    <div onClick={() => changeExamHandler(exam)}>
      <h4>{exam.name}</h4>
    </div>
  ));
  return <div>{examsElms}</div>;
};

export default Exams;
