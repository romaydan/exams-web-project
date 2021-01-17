import React from 'react';
import Input from '../../components/common/FormElements/Input'
import classes from './NewExam.modules.css'
import Input from '../../../shared/components/FormElements/Input';
import classes from './NewExam.modules.css';
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
  const test = [
      id: 'language',
      inputType: 'select',
      options: {
        english: 0,
        hebrew: 1,
      },
      label: 'Language: ',
    },
      id: 'name',
      inputType: 'text',
      label: 'Exam Name: ',
      placeHolder: 'EnterName',
      maxLength: 200,
      id: 'header',
      inputType: 'textarea',
      label: 'Header:',
      id: 'successMessage',
      inputType: 'textarea',
      label: 'Success Message:',
      id: 'failMessage',
      inputType: 'textarea',
      label: 'Fail Message:',
      id: 'name',
      inputType: 'text',
      label: 'Exam Name: ',
      placeHolder: 'EnterName',
      maxLength: 200,
  ];
  const form = test.map((formElement) => {
    return <Input {...formElement} />;
  });

  return (
   const form =test.map(formElement=>{
      return  <Input {...formElement} />
   })
    
    return (
        <div className={classes.NewExam}>
            <h2>Exam Creation </h2>
            {form}
        </div>
    )
}
    <div className={classes.NewExam}>
      <h2>Exam Creation </h2>
      {form}
    <div>
      <ExamForm submited={submitHandler} />
      <QuestionPicker questionSelected={questionPickedHandler} />
    </div>
  );
};

export default NewExam;
