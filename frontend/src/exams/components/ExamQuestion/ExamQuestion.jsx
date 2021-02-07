import React, { useReducer, useEffect } from 'react';
import classes from './ExamQuestion.module.css';
import PropTypes from 'prop-types';
import {
  ACTIONS,
  radioButtonReducer,
} from '../../../shared/utils/radioBtnReducer';

const ExamQuestion = (props) => {
  const [answers, dispatch] = useReducer(radioButtonReducer, []);
  const { question, selectedAnswers, review, answerSelected } = props;

  useEffect(() => {
    let newAnswers = question.possibleAnswers;
    if (selectedAnswers) {
      newAnswers = question.possibleAnswers.map((pa) => {
        selectedAnswers.answers.forEach((sa) => {
          if (pa._id === sa._id) {
            pa.selected = true;
          }
        });
        return pa;
      });
    }
    dispatch({ type: ACTIONS.SET, payload: newAnswers });
  }, [question, selectedAnswers]);

  const answerColor = (answer) => {
    if (review) {
      if (answer.selected)
        return answer.isCorrect ? classes.Selected : classes.Wrong;
      else if (answer.isCorrect) {
        return classes.Selected;
      } else return classes.NotSelected;
    } else return answer.selected ? classes.Selected : classes.NotSelected;
  };

  const onAnswerSelected = (answer) => {
    if (!review) {
      dispatch({
        type:
          +question.type === 0 ? ACTIONS.SELECT_ONE : ACTIONS.SELECT_MULTIPLE,
        payload: answer,
      });
      onAnswerSelected && answerSelected(answer);
    }
  };
  return (
    <div>
      {' '}
      <h4>{question.text}</h4>
      {question &&
        answers.map((answer) => {
          return (
            <div
              key={answer._id}
              className={[classes.Question, answerColor(answer)].join(' ')}
              onClick={() => onAnswerSelected(answer)}
            >
              <h4>{answer.answer}</h4>
            </div>
          );
        })}
      <h5>{question && question.textBelow}</h5>
    </div>
  );
};

ExamQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectedAnswers: PropTypes.array,
  review: PropTypes.bool,
  answerSelected: PropTypes.func.isRequired,
};
export default ExamQuestion;
