import React, { useReducer, useEffect, useRef } from 'react';
import { getQuestions } from '../../../shared/services/questionService';
import SearchBar from '../../../shared/components/UIElements/SearchBar';
import {
  ACTIONS,
  radioButtonReducer,
} from '../../../shared/utils/radioBtnReducer';

import classes from './QuestionPicker.module.css';

const QuestionPicker = (props) => {
  const [questions, dispatch] = useReducer(radioButtonReducer, []);
  // const [questions, setQuestions] = useState([]);
  const allQuestions = useRef([]);
  useEffect(() => {
    getQuestions(props.fieldOfStudy).then((res) => {
      console.log('res :>> ', res);
      dispatch({ type: ACTIONS.SET, payload: res.data });
      allQuestions.current = res.data;
    });
  }, []);

  const questionSelected = (question) => {
    dispatch({ type: ACTIONS.SELECT_MULTIPLE, payload: question });
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
    dispatch({ type: ACTIONS.SET, payload: filtered });
  };

  return (
    <div>
      <SearchBar
        label='Filter By Tags or content'
        changed={searchChangeHandler}
      ></SearchBar>
      {questions.map((question) => (
        <div
          className={question.selected ? classes.Selected : classes.NotSelected}
          key={question._id}
          onClick={() => questionSelected(question)}
        >
          <h3> {question.text}</h3>
          <h5 className={classes.Tags}>{question.tags.join(' | ')}</h5>
        </div>
      ))}
    </div>
  );
};

export default QuestionPicker;
