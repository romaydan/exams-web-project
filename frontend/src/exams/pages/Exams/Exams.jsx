import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getExams } from '../../../shared/services/examService';

import classes from './Exams.module.css';
const Exams = () => {
  const [exams, setExams] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getExams()
      .then((res) => setExams(res.data))
      .catch((error) => {
        console.log('error!', error);
      });
  }, []);
  const editExamHandler = (exam) => {
    history.push(`/exams/edit/${exam._id}`);
  };
  const deleteExamHandler = (exam) => {};
  const examsElms = exams.map((exam) => (
    <div className={classes.Exam}>
      <h4>{exam.name}</h4>
      <div>
        <Button onClick={() => editExamHandler(exam)}>Edit</Button>
        <Button onClick={() => deleteExamHandler(exam)}>Delete</Button>
      </div>
    </div>
  ));
  return (
    <div className={classes.Exams}>
      <h2>Exams Page</h2>
      {examsElms}
    </div>
  );
};

export default Exams;
