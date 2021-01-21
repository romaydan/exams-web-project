import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getExams, deleteExam } from '../../../shared/services/examService';
import classes from './Exams.module.css';
import * as _ from 'lodash';
import SearchBar from '../../../shared/components/UIElements/SearchBar';
const columns = [
  { field: '_id', label: 'ID', order: true },
  { field: 'name', label: 'Exam Name', order: true },
  { field: 'questions', label: 'Num of Questions', order: true },
  { field: 'lastUpdate', label: 'Last Update', order: true },
];
const Exams = () => {
  const [exams, setExams] = useState([]);
  const allExams = useRef([]);
  const history = useHistory();
  useEffect(() => {
    getExams()
      .then((res) => {
        setExams(res.data);
        allExams.current = res.data;
      })
      .catch((error) => {
        console.log('error!', error);
      });
  }, []);
  const editExamHandler = (exam) => {
    history.push(`/exams/edit/${exam._id}`);
  };
  const deleteExamHandler = (exam) => {
    deleteExam(exam._id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setExams((prevExams) => prevExams.filter((ex) => ex._id !== exam._id));
  };
  const sortTableHandler = (col) => {
    setExams((prevState) => {
      let newState = col.order
        ? _.sortBy(prevState, [col.field])
        : _.sortBy(prevState, [col.field]).reverse();
      return newState;
    });
    col.order = !col.order;
  };
  const examsElms = exams.map((exam) => (
    <tr>
      <td>{exam._id}</td>
      <td>{exam.name}</td>
      <td>{exam.questions.length}</td>
      <td>{exam.lastUpdate}</td>
      <td>
        <Button onClick={() => editExamHandler(exam)}>Edit</Button>
        <Button onClick={() => deleteExamHandler(exam)}>Delete</Button>
      </td>
    </tr>
  ));

  const searchChangeHandler = (value) => {
    value = value.trim();
    setExams(allExams.current.filter((exam) => exam.name.includes(value)));
  };
  return (
    <div className={classes.Exams}>
      <h2>Exams Page</h2>

      <SearchBar label='Filter Exams by name: ' changed={searchChangeHandler} />
      <table class='table'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.label} onClick={() => sortTableHandler(col)}>
                {col.label}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>{examsElms}</tbody>
      </table>
    </div>
  );
};

export default Exams;
