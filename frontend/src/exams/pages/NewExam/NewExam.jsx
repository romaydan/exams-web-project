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
    fetchExam();
  }, []);
  const fetchExam = () => {
    if (
      Object.keys(props.match.params).length > 0 &&
      props.match.params.id !== undefined
    ) {
      getExam(props.match.params.id).then((res) => {
        setExam(res.data);
      });
    }
  };
  const submitHandler = (data) => {
    let submitedExam;

    submitedExam = !isAddMode ? { ...data, _id: exam._id } : { ...data };
    submitedExam.questions = pickedQuestions;
    console.log('submitedExam :>> ', submitedExam);
    saveExam(submitedExam)
      .then((res) => console.log('sent', res))
      .catch((error) => console.log('error', error));
  };

  const questionPickedHandler = (question) => {
    if (
      pickedQuestions.find((quest) => quest._id === question._id) !== undefined
    ) {
      pickedQuestions = pickedQuestions.filter(
        (quest) => quest._id !== question._id
      );
    } else {
      pickedQuestions.push(question);
    }
  };
  return (
    <div>
      <h3>{isAddMode ? 'Add User' : 'Edit User'}</h3>
      <ExamForm submited={submitHandler} isAddMode={isAddMode} exam={exam}>
        <QuestionPicker questionSelected={questionPickedHandler} />
      </ExamForm>
    </div>
  );
};

export default NewExam;
