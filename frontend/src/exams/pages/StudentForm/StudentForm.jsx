import Input from '../../../shared/components/FormElements/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { saveStudent } from '../../../shared/services/studentService';
const fields = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name: ',
    placeholder: 'Enter First  Name',
    maxLength: 30,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 30,
    },
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name: ',
    placeholder: 'Enter Last Name',
    maxLength: 30,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 30,
    },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email: ',
    placeholder: 'Enter Email',
    maxLength: 30,
    validation: {
      required: true,
      minLength: 2,
      maxLength: 30,
    },
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone Number: ',
    placeholder: 'Enter Phone',
    maxLength: 11,
    validation: {
      required: true,
      minLength: 9,
      maxLength: 11,
    },
  },
];

const StudentForm = () => {
  const history = useHistory();
  let { examId } = useParams();
  const submitHandler = (data) => {
    let req = { ...data, examId: examId };
    console.log('req', req);
    saveStudent(req).then((res) => {
      console.log('res', res.data);
      let newUrl = examId + '/' + res.data._id;
      console.log('newUrl :>> ', newUrl);
      history.push(newUrl);
    });
  };
  console.log('in Student Form');

  const { register, errors, handleSubmit } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {fields.map((field) => (
          <div key={field.name}>
            <Input reference={register} {...field} />
            {errors[field.name] && <p>invalid {field.name}</p>}
          </div>
        ))}
        <button type='submit'>Enter Test</button>
      </form>
    </div>
  );
};

export default StudentForm;
