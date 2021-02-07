import React, { useState, useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../../../shared/services/questionService';
import SearchBar from '../../../shared/components/UIElements/SearchBar';
import {
  ACTIONS,
  radioButtonReducer,
} from '../../../shared/utils/radioBtnReducer';

import classes from './QuestionPicker.module.css';
import { Accordion, Badge, Button } from 'react-bootstrap';

const QuestionPicker = (props) => {
  const {
    fieldOfStudy,
    examQuestions,
    pickedQuestions,
    questionSelected,
  } = props;
  const [questions, dispatch] = useReducer(radioButtonReducer, []);
  const allQuestions = useRef([]);
  const [pickedAll, setPickedAll] = useState(false);
  const [accordionKey, setAccordionKey] = useState('');
  useEffect(() => {
    getQuestions(fieldOfStudy).then((res) => {
      allQuestions.current = res.data;
      dispatch({ type: ACTIONS.SET, payload: res.data });
    });
  }, [fieldOfStudy]);
  useEffect(() => {
    if (examQuestions) {
      let newQuestions = questions.map((question) => {
        selectSelectedAnswers(examQuestions, question);
        return question;
      });
      questionSelected(examQuestions);
      dispatch({ type: ACTIONS.SET, payload: newQuestions });
    }
  }, [examQuestions]);

  const onQuestionSelected = (question) => {
    dispatch({ type: ACTIONS.SELECT_MULTIPLE, payload: question });
    questionSelected(question);
  };

  const searchChangeHandler = (value) => {
    if (value.trim() === '') {
      getQuestions(fieldOfStudy).then(
        (res) => (allQuestions.current = res.data)
      );
    }
    let filtered = allQuestions.current.filter(
      (quest) =>
        quest.text.includes(value) ||
        quest.tags.filter((tag) => tag.includes(value)).length > 0
    );
    filtered.forEach((question) => {
      selectSelectedAnswers(pickedQuestions, question);
    });
    dispatch({ type: ACTIONS.SET, payload: filtered });
  };
  const selectAllHandler = () => {
    let newQuestions = selectAllExtenstion(!pickedAll);
    const questionsToSelect = !pickedAll ? newQuestions : [];
    questionSelected(questionsToSelect);
    dispatch({ type: ACTIONS.SET, payload: newQuestions });
  };

  const selectAllExtenstion = (boolean) => {
    setPickedAll(boolean);
    return questions.map((question) => {
      let newQuestion = { ...question };
      newQuestion.selected = boolean;
      return newQuestion;
    });
  };
  return (
    <div>
      <div className={[classes.Dashboard, 'input-group'].join(' ')}>
        <SearchBar
          label='Filter By Tags or content'
          changed={searchChangeHandler}
        ></SearchBar>
        <Button variant='info' onClick={selectAllHandler}>
          {pickedAll ? 'Deselect All' : 'Select All'}
        </Button>
        <h3> Questions Picked {pickedQuestions.length}</h3>
      </div>
      <Accordion
        onSelect={(eventKey) => {
          setAccordionKey(eventKey);
        }}
      >
        {questions.map((question) => {
          return (
            <div
              key={question._id}
              className={[
                classes.Question,
                question.selected ? classes.Selected : classes.NotSelected,
              ].join(' ')}
              onClick={() => onQuestionSelected(question)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 title={question.text}>
                  {accordionKey === question._id ||
                  question.text.split(' ').length < 10
                    ? question.text
                    : question.text.split(' ').splice(0, 10).join(' ') + '...'}
                </h3>
                <Accordion.Toggle
                  as={Button}
                  variant='secondary'
                  eventKey={question._id}
                  onClick={(e) => e.stopPropagation()}
                >
                  Show
                </Accordion.Toggle>
              </div>
              {question.tags.map((tag) => (
                <h5>
                  <Badge variant='secondary'>{tag}</Badge>
                </h5>
              ))}

              <Accordion.Collapse eventKey={question._id}>
                <div className={classes.Answers}>
                  {question.possibleAnswers.map((posAns, index) => (
                    <div
                      key={index}
                      className={
                        posAns.isCorrect
                          ? [classes.Selected, classes.Answer].join(' ')
                          : [classes.NotSelected, classes.Answer].join(' ')
                      }
                    >
                      posAns.answer
                    </div>
                  ))}
                </div>
              </Accordion.Collapse>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};
QuestionPicker.propTypes = {
  fieldOfStudy: PropTypes.object.isRequired,
  examQuestions: PropTypes.array.isRequired,
  questionSelected: PropTypes.func.isRequired,
  pickedQuestions: PropTypes.array,
};
export default QuestionPicker;

function selectSelectedAnswers(examQuestions, question) {
  examQuestions.forEach((quest) => {
    if (quest._id === question._id) {
      question.selected = true;
    }
  });
}
