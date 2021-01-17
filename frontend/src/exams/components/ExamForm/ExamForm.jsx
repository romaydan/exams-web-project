import React from 'react';
import Input from '../../../shared/components/FormElements/Input';
import { useForm } from 'react-hook-form';
import classes from './ExamForm.modules.css';

const test = [
  {
    inputId: 'language',
    inputType: 'select',
    options: {
      english: 0,
      hebrew: 1,
    },
    label: 'Language: ',
  },
  {
    inputId: 'name',
    inputType: 'text',
    label: 'Exam Name: ',
    placeHolder: 'EnterName',
    maxLength: 200,
  },
  {
    inputId: 'header',
    inputType: 'textarea',
    label: 'Header:',
  },
  {
    inputId: 'success',
    inputType: 'textarea',
    label: 'Success Message:',
  },
  {
    inputId: 'failure',
    inputType: 'textarea',
    label: 'Fail Message:',
  },
  {
    inputId: 'passingGrade',
    inputType: 'number',
    label: 'Passing Grade: ',
    max: 100,
    min: 54,
  },
  {
    inputId: 'isShow',
    inputType: 'checkbox',
    label: 'Passing Grade: ',
    max: 100,
    min: 54,
  },
];
const ExamForm = (props) => {
  const { register, handleSubmit } = useForm();
  // const onSubmit = (data, e) => {
  //   console.log(e);
  //   console.log(data);
  //   saveExam({ ...data, questions: [] })
  //     .then((response) => {
  //       console.log('response :>> ', response);
  //       alert('new Exam Submitted');
  //     })
  //     .catch((error) => console.log(error));
  // };
  const formInputs = test.map((formElement) => {
    return (
      <Input
        key={formElement.inputId}
        {...formElement}
        name={formElement.inputId}
        refHandler={register}
      />
    );
  });

  return (
    <div className={classes.NewExam}>
      <h2>Exam Creation </h2>
      <form onSubmit={handleSubmit(props.submited)}>
        {formInputs}
        <input type='submit'></input>
      </form>
    </div>
  );
};
export default ExamForm;
