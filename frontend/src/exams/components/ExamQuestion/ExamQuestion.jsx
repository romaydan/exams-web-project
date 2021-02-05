import React, { useReducer, useEffect } from 'react';
import classes from './ExamQuestion.module.css';
import {
  ACTIONS,
  radioButtonReducer,
} from '../../../shared/utils/radioBtnReducer';

const ExamQuestion = (props) => {
  const [answers, dispatch] = useReducer(radioButtonReducer, []);

  useEffect(() => {
    let newAnswers = props.question.possibleAnswers;
    if (props.selectedAnswers) {
      newAnswers = props.question.possibleAnswers.map((pa) => {
        props.selectedAnswers.answers.forEach((sa) => {
          if (pa._id === sa._id) {
            pa.selected = true;
          }
        });
        return pa;
      });
    }
    dispatch({ type: ACTIONS.SET, payload: newAnswers });
  }, [props.question, props.selectedAnswers]);

  const answerColor = (answer) => {
    if (props.review) {
      if (answer.selected)
        return answer.isCorrect ? classes.Selected : classes.Wrong;
      else if (answer.isCorrect) {
        return classes.Selected;
      } else return classes.NotSelected;
    } else return answer.selected ? classes.Selected : classes.NotSelected;
  };

  const answerSelected = (answer) => {
    if (!props.review) {
      dispatch({
        type:
          +props.question.type === 0
            ? ACTIONS.SELECT_ONE
            : ACTIONS.SELECT_MULTIPLE,
        payload: answer,
      });
      props.answerSelected && props.answerSelected(answer);
    }
  };
  return (
    <div>
      {' '}
      <h4>{props.question.text}</h4>
      {props.question &&
        answers.map((answer) => {
          return (
            <div
              key={answer._id}
              className={[classes.Question, answerColor(answer)].join(' ')}
              onClick={() => answerSelected(answer)}
            >
              <h4>{answer.answer}</h4>
            </div>
          );
        })}
      <h5>{props.question && props.question.textBelow}</h5>
    </div>
  );
};

export default ExamQuestion;
