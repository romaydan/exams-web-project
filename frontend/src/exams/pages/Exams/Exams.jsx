import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getExams, deleteExam } from '../../../shared/services/examService';
import classes from './Exams.module.css';
import * as _ from 'lodash';
import SearchBar from '../../../shared/components/UIElements/SearchBar';
import { toast } from 'react-toastify';
const columns = [
  { field: '_id', label: 'ID', order: true },
  { field: 'name', label: 'Exam Name', order: true },
  { field: 'questions', label: 'Num of Questions', order: true },
  { field: 'lastUpdate', label: 'Last Update', order: true },
];
const Exams = (props) => {
  const [exams, setExams] = useState([]);
  const allExams = useRef([]);
  const history = useHistory();
  useEffect(() => {
    getExams(props.fieldOfStudy)
      .then((res) => {
        console.log('res :>> ', res);
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
  const copyLinkHandler = (exam) => {
    var tempInput = document.createElement('input');
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
    tempInput.value = `http://localhost:3000/exams/${exam._id}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast.success('exam link copied to clipboard.');
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
    <tr key={exam._id}>
      <td>{exam._id}</td>
      <td>{exam.name}</td>
      <td>{exam.questions.length}</td>
      <td>{exam.lastUpdate}</td>
      <td>
        <Button variant='light' onClick={() => copyLinkHandler(exam)}>
          Link
        </Button>
      </td>
      <td>
        <Button variant='warning' onClick={() => editExamHandler(exam)}>
          Edit
        </Button>
      </td>
      <td>
        <Button variant='danger' onClick={() => deleteExamHandler(exam)}>
          Delete
        </Button>
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
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <SearchBar
          label='Filter Exams by name: '
          changed={searchChangeHandler}
        />
        <Link className='btn btn-info' to='/exams/new'>
          Create New Exam
        </Link>
      </div>
      <table className='table'>
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
