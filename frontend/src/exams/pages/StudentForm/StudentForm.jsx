import Input from '../../../shared/components/FormElements/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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

const StudentForm = (props) => {
  const { history } = props;
  let { examId } = useParams();
  const { register, errors, handleSubmit } = useForm();

  const submitHandler = (data) => {
    let req = { ...data, examId: examId };
    saveStudent(req)
      .then((res) => {
        history.push(`${examId}/${res.data._id}`);
        // history.push(`/${res.data._id}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400)
          history.push(`${examId}/${error.response.data}/result`);
      });
  };
  // console.log('in Student Form');

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {fields.map((field, index) => (
          <div className='form-group' key={index}>
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
