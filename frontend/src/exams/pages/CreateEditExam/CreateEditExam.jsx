import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import ExamForm from '../../components/ExamForm/ExamForm';
import QuestionPicker from '../../components/QuestionPicker/QuestionPicker';
import { saveExam, getExam } from '../../../shared/services/examService';

const CreateEditExam = (props) => {
  const { fieldOfStudy } = props;
  const { params } = props.match;
  const { id } = params;
  const isAddMode = !id;

  const [pickedQuestions, setPickedQuestions] = useState([]);
  const [exam, setExam] = useState({});

  useEffect(() => {
    if (Object.keys(params).length > 0 && params.id !== undefined) {
      getExam(params.id).then((res) => {
        setExam(res.data);
      });
    }
  }, [params]);

  const submitHandler = (data) => {
    let submitedExam;
    submitedExam = !isAddMode ? { ...data, _id: exam._id } : { ...data };
    submitedExam.questions = pickedQuestions.map((question) => question._id);
    saveExam(submitedExam, fieldOfStudy)
      .then((res) => {
        setExam(res.data);
        toast.success('Exam Saved');
      })
      .catch((error) => {
        toast.error('something went wrong');
      });
  };
  const questionSelectedHandler = (question) => {
    let newQuestion = { ...question };
    delete newQuestion.selected;
    if (Array.isArray(question)) {
      setPickedQuestions([...question]);
    } else if (
      pickedQuestions.find((quest) => quest._id === newQuestion._id) !==
      undefined
    ) {
      setPickedQuestions(
        pickedQuestions.filter((quest) => quest._id !== newQuestion._id)
      );
    } else {
      setPickedQuestions([...pickedQuestions, question]);
    }
  };
  return (
    <div>
      <h3>{isAddMode ? 'Add Exam' : 'Edit Exam'}</h3>
      <ExamForm
        submited={(data) => submitHandler(data)}
        isAddMode={isAddMode}
        exam={exam}
      ></ExamForm>
      <QuestionPicker
        fieldOfStudy={fieldOfStudy}
        questionSelected={(question) => questionSelectedHandler(question)}
        examQuestions={isAddMode ? null : exam.questions}
        pickedQuestions={pickedQuestions}
      />

      <Link to='/exams' className='btn btn-success'>
        Go To Exams
      </Link>
      <button
        form='exam-form'
        style={{ marginLeft: '20px' }}
        className='btn btn-primary'
        type='submit'
      >
        Save Exam
      </button>
    </div>
  );
};

CreateEditExam.propTypes = {
  fieldOfStudy: PropTypes.object.isRequired,
};
export default CreateEditExam;
