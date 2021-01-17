import React from 'react';
import ExamForm from '../../components/ExamForm/ExamForm';
import QuestionPicker from '../../components/QuestionPicker/QuestionPicker';
import { saveExam } from '../../../shared/services/examService';
let pickedQuestions = [];
const NewExam = () => {
  const submitHandler = (data) => {
    let exam = { ...data };
    exam.questions = pickedQuestions;
    console.log('exam :>> ', exam);
    saveExam(exam)
      .then((res) => console.log('sent', res))
      .catch((error) => console.log('error', error));
  };

  const questionPickedHandler = (question) => {
    console.log('question :>> ', question);
    if (
      pickedQuestions.find((quest) => quest._id === question._id) !== undefined
    ) {
      pickedQuestions = pickedQuestions.filter(
        (quest) => quest._id !== question._id
      );
      console.log('in');
    } else {
      console.log('not');
      pickedQuestions.push(question);
    }
    console.log('pickedQuestions :>> ', pickedQuestions);
  };

  return (
    <div>
      <ExamForm submited={submitHandler} />
      <QuestionPicker questionSelected={questionPickedHandler} />
    </div>
  );
};

export default NewExam;
