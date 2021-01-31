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
  const allQuestions = useRef([]);
  useEffect(() => {
    getQuestions(props.fieldOfStudy).then((res) => {
      allQuestions.current = res.data;
      dispatch({ type: ACTIONS.SET, payload: res.data });
    });
  }, [props.fieldOfStudy]);

  useEffect(() => {
    if (props.examQuestions) {
      let newQuestions = questions.map((question) => {
        props.examQuestions.forEach((quest) => {
          if (quest._id === question._id) {
            question.selected = true;
          }
        });
        return question;
      });
      dispatch({ type: ACTIONS.SET, payload: newQuestions });
    }
  }, [props.examQuestions]);
  const questionSelected = (question) => {
    dispatch({ type: ACTIONS.SELECT_MULTIPLE, payload: question });
    props.questionSelected(question);
  };

  const searchChangeHandler = (value) => {
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
      {questions.map((question) => {
        return (
          <div
            key={question._id}
            className={
              question.selected ? classes.Selected : classes.NotSelected
            }
            onClick={() => questionSelected(question)}
          >
            <h3> {question.text}</h3>
            <h5 className={classes.Tags}>{question.tags.join(' | ')}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionPicker;
