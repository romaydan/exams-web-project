import React, { useState, useEffect, useRef } from 'react';
import { getQuestions } from '../../../shared/services/questionService';
import SearchBar from '../../../shared/components/UIElements/SearchBar';
import classes from './QuestionPicker.module.css';

const QuestionPicker = (props) => {
  const [questions, setQuestions] = useState([]);
  const allQuestions = useRef([]);
  useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res.data);
      allQuestions.current = res.data;
    });
  }, []);
  const questionPicked = (question) => {
    const newQuestions = [...questions];
    const index = newQuestions.indexOf(question);
    newQuestions[index] = { ...newQuestions[index] };
    newQuestions[index].picked = !newQuestions[index].picked;
    setQuestions(newQuestions);
    delete question.picked;
    props.questionSelected(question);
  };
  const searchChangeHandler = (value) => {
    console.log('allQuestions :>> ', allQuestions);
    if (value.trim() === '') {
    }
    let filtered = allQuestions.current.filter(
      (quest) =>
        quest.text.includes(value) ||
        quest.tags.filter((tag) => tag.includes(value)).length > 0
    );
    setQuestions(filtered);
  };
  let questionsItems = questions.map((question) => {
    return (
      <div
        className={question.picked ? classes.Picked : classes.NotPicked}
        key={question._id}
        onClick={() => questionPicked(question)}
      >
        <h3> {question.text}</h3>
        <h5 className={classes.Tags}>{question.tags.join(' | ')}</h5>
      </div>
    );
  });

  return (
    <div>
      <SearchBar
        label='Filter By Tags or content'
        changed={searchChangeHandler}
      ></SearchBar>
      {questionsItems}
    </div>
  );
};

export default QuestionPicker;
