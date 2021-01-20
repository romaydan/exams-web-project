// import React, { useEffect } from 'react';
// import Input from '../../../shared/components/FormElements/Input';
// import { useForm, Controller } from 'react-hook-form';
// import classes from './ExamForm.modules.css';
// import { Button } from '@material-ui/core';
// import SaveIcon from '@material-ui/icons/Save';
// import { isEmpty } from 'lodash';
// const fieldsProps = [
//   {
//     name: 'language',
//     inputType: 'select',
//     options: {
//       english: 0,
//       hebrew: 1,
//     },
//     defaultValue: 0,
//     label: 'Language: ',
//     validation: {
//       required: true,
//     },
//   },
//   {
//     name: 'name',
//     inputType: 'text',
//     defaultValue: '',
//     label: 'Exam Name: ',
//     placeHolder: 'EnterName',
//     maxLength: 200,
//     validation: {
//       required: true,
//       minLength: 2,
//       maxLength: 200,
//     },
//   },
//   {
//     name: 'header',
//     inputType: 'textarea',
//     defaultValue: '',

//     label: 'Header:',
//     validation: {
//       required: true,
//     },
//   },
//   {
//     name: 'success',
//     inputType: 'textarea',
//     defaultValue: '',

//     label: 'Success Message:',
//     validation: {
//       required: true,
//     },
//   },
//   {
//     name: 'failure',
//     inputType: 'textarea',
//     defaultValue: '',

//     label: 'Fail Message:',
//     validation: {
//       required: true,
//     },
//   },
//   {
//     name: 'passingGrade',
//     inputType: 'number',
//     defaultValue: 54,

//     label: 'Passing Grade: ',
//     validation: {
//       max: 100,
//       min: 54,
//     },
//   },
//   {
//     name: 'isShow',
//     inputType: 'checkbox',
//     defaultValue: false,
//     label: 'Show answers after?:  ',
//     validation: {},
//   },
// ];
// const ExamForm = (props) => {
//   console.log('props :>> ', props);
//   const { handleSubmit, setValue, control, register, errors } = useForm({
//     mode: 'onChange',
//   });
//   // const { isDirty, isValid } = formState;

//   useEffect(() => {
//     console.log('props :>> ', props);

//     if (!props.isAddMode && !isEmpty(props.exam)) {
//       console.log(' in here');
//       props.exam.forEach((field) => {
//         setValue(field, props.exam[field]);
//       });
//     }
//   }, []);

//   const formInputs = fieldsProps.map((field) => {
//     if (props.exam && Object.keys(props.exam).length > 0) {
//       // field.defaultValue = props.exam[field.name];
//       field.varient = 'filled';
//     }
//     // console.log('props.exam :>> ', props.exam[field.name]);
//     return (
//       <div key={field.name}>
//         <Controller
//           control={control}
//           {...field}
//           render={(props) => {
//             return <Input {...field} {...props} />;
//           }}
//         />
//         {errors[field.name] && <p>invalid {field.name}</p>}
//       </div>
//     );
//   });

//   return (
//     <div className={classes.NewExam}>
//       <form onSubmit={handleSubmit(props.submited)}>
//         {formInputs}
//         {props.children}
//         <button type='submit'>Save Exam</button>
//       </form>
//     </div>
//   );
// };
// export default ExamForm;
