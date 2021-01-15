import React from 'react'
import Input from '../../components/common/FormElements/Input'
import classes from './NewExam.modules.css'
const NewExam = (props) => {
const test =[
    {
    id:'language',
    inputType:"select",
    options:{
        english:0,
        hebrew:1
        },
    label:"Language: "},
    {
        id:'name',
        inputType:"text",
        label:"Exam Name: ",
        placeHolder:"EnterName",
        maxLength:200
    },
    {
        id:'header',
        inputType:"textarea",
        label:"Header:"
    },
    {
        id:'successMessage',
        inputType:"textarea",
        label:"Success Message:"
    },
    {
        id:'failMessage',
        inputType:"textarea",
        label:"Fail Message:"
    },
    {
        id:'name',
        inputType:"text",
        label:"Exam Name: ",
        placeHolder:"EnterName",
        maxLength:200
    },
   
];
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

export default NewExam
