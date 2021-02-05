import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../../shared/components/FormElements/Input';

import classes from './ExamForm.module.css';

const fieldsProps = [
  {
    name: 'language',
    type: 'select',
    options: {
      english: 0,
      hebrew: 1,
    },
    defaultValue: 0,
    label: 'Language: ',
    validation: {
      required: true,
    },
  },
  {
    name: 'name',
    type: 'text',
    defaultValue: '',
    label: 'Exam Name: ',
    placeholder: 'Enter Name',
    maxLength: 200,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 200,
    },
  },
  {
    name: 'header',
    type: 'textarea',
    defaultValue: '',

    label: 'Header:',
    validation: {
      required: true,
    },
  },
  {
    name: 'success',
    type: 'textarea',
    defaultValue: '',

    label: 'Success Message:',
    validation: {
      required: true,
    },
  },
  {
    name: 'failure',
    type: 'textarea',
    defaultValue: '',

    label: 'Fail Message:',
    validation: {
      required: true,
    },
  },
  {
    name: 'passingGrade',
    type: 'number',
    defaultValue: 54,

    label: 'Passing Grade: ',
    validation: {
      max: 100,
      min: 54,
    },
  },
  {
    name: 'isShow',
    type: 'checkbox',
    label: 'Show answers after?:  ',
    validation: {},
  },
];

const ExamForm = (props) => {
  const { handleSubmit, register, errors, setValue } = useForm();
  useEffect(() => {
    Object.keys(props.exam).forEach((key) => {
      if (key !== '_id' || key !== '__v') {
        setValue(key, props.exam[key]);
      }
    });
  }, [props.exam, setValue]);

  const formInputs = fieldsProps.map((field, index) => {
    return (
      <div key={index}>
        <Input reference={register(field.validation)} id={index} {...field} />
        {errors[field.name] && <p>invalid {field.name}</p>}
      </div>
    );
  });

  return (
    <div className={classes.ExamForm}>
      <form id='exam-form' onSubmit={handleSubmit(props.submited)}>
        {formInputs}
        {props.children}
      </form>
    </div>
  );
};

export default ExamForm;
