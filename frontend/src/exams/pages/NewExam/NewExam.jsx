import React, { useState, useEffect } from 'react';
import ExamForm from '../../components/ExamForm/ExamForm';
import QuestionPicker from '../../components/QuestionPicker/QuestionPicker';
import { saveExam, getExam } from '../../../shared/services/examService';
import { Link } from 'react-router-dom';
let pickedQuestions = [];
const NewExam = (props) => {
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
      });
    }
  }, [props.match.params]);
  const submitHandler = (data) => {
    let submitedExam;
    submitedExam = !isAddMode ? { ...data, _id: exam._id } : { ...data };
    submitedExam.questions = pickedQuestions.map((question) => question._id);
    console.log('submitedExam :>> ', submitedExam);
    saveExam(submitedExam, props.fieldOfStudy)
      .then((res) => setExam(res.data))
      .catch((error) => console.log('error', error));
  };

  const questionSelectedHandler = (question) => {
    console.log('question', question);
    let newQuestion = { ...question };
    delete newQuestion.selected;
    if (
      pickedQuestions.find((quest) => quest._id === newQuestion._id) !==
      undefined
    ) {
      pickedQuestions = pickedQuestions.filter(
        (quest) => quest._id !== newQuestion._id
      );
    } else {
      pickedQuestions = [...pickedQuestions, question];
    }
    console.log('pcikedQuestions :>> ', pickedQuestions);
  };
  console.log('exam :>> ', exam);
  return (
    <div>
      <h3>{isAddMode ? 'Add Exam' : 'Edit Exam'}</h3>
      <ExamForm submited={submitHandler} isAddMode={isAddMode} exam={exam}>
        <QuestionPicker
          fieldOfStudy={props.fieldOfStudy}
          questionSelected={questionSelectedHandler}
          examQuestions={isAddMode ? null : exam.questions}
        />

        <Link to='/exams' className='btn btn-success'>
          Go To Exams
        </Link>
      </ExamForm>
    </div>
  );
};

export default NewExam;
