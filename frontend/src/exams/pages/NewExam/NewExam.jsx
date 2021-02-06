import React, { useState, useEffect } from 'react';
import ExamForm from '../../components/ExamForm/ExamForm';
import QuestionPicker from '../../components/QuestionPicker/QuestionPicker';
import { saveExam, getExam } from '../../../shared/services/examService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const NewExam = (props) => {
  const [pickedQuestions, setPickedQuestions] = useState([]);
  const { id } = props.match.params;
  const isAddMode = !id;
  const [exam, setExam] = useState({});
  useEffect(() => {
    if (
      Object.keys(props.match.params).length > 0 &&
      props.match.params.id !== undefined
    ) {
      getExam(props.match.params.id).then((res) => {
        setExam(res.data);
        // setPickedQuestions(res.data.questions);
      });
    }
  }, [props.match.params]);

  const submitHandler = (data) => {
    let submitedExam;
    submitedExam = !isAddMode ? { ...data, _id: exam._id } : { ...data };
    submitedExam.questions = pickedQuestions.map((question) => question._id);
    saveExam(submitedExam, props.fieldOfStudy)
      .then((res) => {
        setExam(res.data);
        toast.success('Exam Saved');
      })
      .catch((error) => {
        console.log('error', error.response);
        toast.error('something went wrong');
      });
  };
  const questionSelectedHandler = (question) => {
    console.log('questionSelected inside  :>> ', question);
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
        fieldOfStudy={props.fieldOfStudy}
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

export default NewExam;
