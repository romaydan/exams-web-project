import React, { useState, useEffect } from 'react';
import ExamForm from '../../components/ExamForm/ExamForm2';
import QuestionPicker from '../../components/QuestionPicker/QuestionPicker';
import { saveExam, getExam } from '../../../shared/services/examService';
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
    saveExam(submitedExam)
      .then((res) => setExam(res.data))
      .catch((error) => console.log('error', error));
  };

  const questionSelectedHandler = (question) => {
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
      pickedQuestions.push(newQuestion);
    }
  };
  return (
    <div>
      <h3>{isAddMode ? 'Add User' : 'Edit User'}</h3>
      <ExamForm submited={submitHandler} isAddMode={isAddMode} exam={exam}>
        <QuestionPicker questionSelected={questionSelectedHandler} />
      </ExamForm>
    </div>
  );
};

export default NewExam;
