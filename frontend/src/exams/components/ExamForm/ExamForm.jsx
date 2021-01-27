import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classes from './ExamForm.module.css';
import Input from '../../../shared/components/FormElements/Input';

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
    placeHolder: 'EnterName',
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
    defaultValue: false,
    label: 'Show answers after?:  ',
    validation: {},
  },
];
const ExamForm = (props) => {
  console.log('props :>> ', props);
  const { handleSubmit, register, errors, setValue } = useForm();
  // const { isDirty, isValid } = formState;
  useEffect(() => {
    Object.keys(props.exam).forEach((key) => {
      if (key !== '_id' || key !== '__v') {
        setValue(key, props.exam[key]);
      }
    });
  }, [props.exam, setValue]);

  const formInputs = fieldsProps.map((field) => {
    return (
      <div>
        <Input reference={register} {...field} />
        {errors[field.name] && <p>invalid {field.name}</p>}
      </div>
    );
  });

  return (
    <div className={classes.ExamForm}>
      <form onSubmit={handleSubmit(props.submited)}>
        {formInputs}
        {props.children}
        <button type='submit'>Save Exam</button>
      </form>
    </div>
  );
};
export default ExamForm;

// <Controller
// control={control}
// name='language'
// render={(props) => (
//   <FormControl style={{ minWidth: '120px' }}>
//     <InputLabel>Language</InputLabel>
//     <Select
//       value={getValues().language ? getValues().language : 0}
//       inputRef={props.ref}
//       onChange={props.onChange}
//     >
//       {Object.keys(languages).map((key) => (
//         <MenuItem value={languages[key]}>{key}</MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// )}
// />
// <Controller
// control={control}
// name='name'
// render={(props) => (
//   <FormControl style={{ minWidth: '120px' }}>
//     <TextField
//       inputRef={props.ref}
//       onChange={props.onChange}
//       label='Name'
//       varient='outlined'
//     ></TextField>
//   </FormControl>
// )}
// />
