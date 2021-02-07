import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  },
  {
    name: 'name',
    type: 'text',
    defaultValue: '',
    label: 'Exam Name: ',
    placeholder: 'Enter Name',
    maxLength: 200,
  },
  {
    name: 'header',
    type: 'textarea',
    defaultValue: '',

    label: 'Header:',
  },
  {
    name: 'success',
    type: 'textarea',
    defaultValue: '',

    label: 'Success Message:',
  },
  {
    name: 'failure',
    type: 'textarea',
    defaultValue: '',

    label: 'Fail Message:',
  },
  {
    name: 'passingGrade',
    type: 'number',
    defaultValue: 54,
    label: 'Passing Grade: ',
  },
  {
    name: 'isShow',
    type: 'checkbox',
    label: 'Show answers after?:  ',
  },
];
const schema = yup.object().shape({
  language: yup.number().min(0).max(1).required(),
  name: yup.string().min(2).max(200).required(),
  header: yup.string().required(),
  success: yup.string().required(),
  failure: yup.string().required(),
  passingGrade: yup.number().min(54).max(100).required(),
  isShow: yup.boolean().required(),
});

const ExamForm = (props) => {
  const { exam, submited } = props;
  const { handleSubmit, register, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    Object.keys(exam).forEach((key) => {
      if (key !== '_id' || key !== '__v') {
        setValue(key, exam[key]);
      }
    });
  }, [exam, setValue]);

  const formInputs = fieldsProps.map((field, index) => {
    return (
      <div key={index}>
        <Input reference={register(field.validation)} id={index} {...field} />
        {<p>{errors[field.name]?.message}</p>}
      </div>
    );
  });

  return (
    <div className={classes.ExamForm}>
      <form id='exam-form' onSubmit={handleSubmit(submited)}>
        {formInputs}
        {props.children}
      </form>
    </div>
  );
};
ExamForm.propTypes = {
  exam: PropTypes.object,
  submited: PropTypes.func.isRequired,
};
export default ExamForm;
