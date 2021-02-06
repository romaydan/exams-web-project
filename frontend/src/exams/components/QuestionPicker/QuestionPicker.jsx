import React, { useState, useReducer, useEffect, useRef } from 'react';
import { getQuestions } from '../../../shared/services/questionService';
import SearchBar from '../../../shared/components/UIElements/SearchBar';
import {
  ACTIONS,
  radioButtonReducer,
} from '../../../shared/utils/radioBtnReducer';

import classes from './QuestionPicker.module.css';
import { Accordion, Badge, Button } from 'react-bootstrap';

const QuestionPicker = (props) => {
  const [questions, dispatch] = useReducer(radioButtonReducer, []);
  const allQuestions = useRef([]);
  const [pickedAll, setPickedAll] = useState(false);
  const [accordionKey, setAccordionKey] = useState('');
  useEffect(() => {
    getQuestions(props.fieldOfStudy).then((res) => {
      allQuestions.current = res.data;
      dispatch({ type: ACTIONS.SET, payload: res.data });
    });
  }, [props.fieldOfStudy]);
  useEffect(() => {
    if (props.examQuestions) {
      console.log('props.examQuestions in picker:>> ', props.examQuestions);
      console.log('questions in picker:>> ', questions);
      let newQuestions = questions.map((question) => {
        props.examQuestions.forEach((quest) => {
          if (quest._id === question._id) {
            question.selected = true;
          }
        });
        return question;
      });
      console.log('here :>> ');
      props.questionSelected(props.examQuestions);
      dispatch({ type: ACTIONS.SET, payload: newQuestions });
    }
  }, [props.examQuestions]);

  const questionSelected = (question) => {
    dispatch({ type: ACTIONS.SELECT_MULTIPLE, payload: question });
    props.questionSelected(question);
  };

  const searchChangeHandler = (value) => {
    if (value.trim() === '') {
      getQuestions(props.fieldOfStudy).then(
        (res) => (allQuestions.current = res.data)
      );
    }
    let filtered = allQuestions.current.filter(
      (quest) =>
        quest.text.includes(value) ||
        quest.tags.filter((tag) => tag.includes(value)).length > 0
    );
    filtered.forEach((question) => {
      props.pickedQuestions.forEach((quest) => {
        if (quest._id === question._id) {
          question.selected = true;
        }
      });
    });
    console.log('filtered', filtered);
    dispatch({ type: ACTIONS.SET, payload: filtered });
  };
  const selectAllHandler = () => {
    let newQuestions = selectAllExtenstion(!pickedAll);
    const questionsToSelect = !pickedAll ? newQuestions : [];
    props.questionSelected(questionsToSelect);
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
        <h3> Questions Picked {props.pickedQuestions.length}</h3>
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
              onClick={() => questionSelected(question)}
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

export default QuestionPicker;
