import { useEffect, useState } from 'react';

import PossibleAnswerForm from '../components/PossibleAnswerForm';

import {
  getQuestion,
  saveQuestion,
} from '../../shared/services/questionService';

function QuestionForm(props) {
  const [data, setData] = useState({
    type: 0,
    text: '',
    textBelow: '',
    possibleAnswers: [{ answer: '', isCorrect: false }],
    answersLayout: 0,
    tags: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function populateQuestion() {
      try {
        const questionId = props.match.params.id;
        if (questionId === 'new') return;

        const { data: question } = await getQuestion(questionId);
        setData(mapToViewModel(question));
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace('/not-found');
      }
    }

    populateQuestion();
  }, [props.history, props.match.params.id]);

  const mapToViewModel = (question) => {
    return {
      _id: question._id,
      type: question.type,
      text: question.text,
      textBelow: question.textBelow,
      possibleAnswers: question.possibleAnswers,
      answersLayout: question.answersLayout,
      tags: question.tags.reduce((a, c) => a + ', ' + c),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      data.tags = data.tags.split(', ');
      await saveQuestion(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) setError(ex.response.data);
      return;
    }

    props.history.push('/questions');
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    const newData = { ...data };

    newData[name] = value;
    setData(newData);
  };

  const handlePossibleAnswerDelete = (possibleAnswer) => {
    const newData = { ...data };
    const index = newData.possibleAnswers.indexOf(possibleAnswer);

    newData.possibleAnswers.splice(index, 1);
    setData(newData);
  };

  const handlePossibleAnswerChange = (e) => {
    const { id, name, value, checked } = e.currentTarget;
    const newData = { ...data };

    newData.possibleAnswers[id][name] = name === 'answer' ? value : checked;
    setData(newData);
  };

  const handlePossibleAnswerAdd = () => {
    const newData = { ...data };

    newData.possibleAnswers.push({ answer: '', isCorrect: false });
    setData(newData);
  };

  return (
    <div>
      <h1>Question Form</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='type'>Question type:</label>

          <select
            name='type'
            id='type'
            value={data.type}
            onChange={handleChange}
            className='form-control'
          >
            <option value={0}>Single Choice Question</option>
            <option value={1}>Multiple Selection Question</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Question text:</label>

          <textarea
            name='text'
            id='text'
            rows='2'
            value={data.text}
            onChange={handleChange}
            className='form-control'
          ></textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='textBelow'>Text below question:</label>

          <textarea
            name='textBelow'
            id='textBelow'
            rows='4'
            value={data.textBelow}
            onChange={handleChange}
            className='form-control'
          ></textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='possibleAnswers'>Possible answers:</label>

          {data.possibleAnswers.map((possibleAnswer, index) => (
            <PossibleAnswerForm
              key={possibleAnswer._id || index}
              possibleAnswer={possibleAnswer}
              index={index}
              handleChange={handlePossibleAnswerChange}
              handleDelete={handlePossibleAnswerDelete}
            />
          ))}

          <button
            type='button'
            onClick={handlePossibleAnswerAdd}
            className='btn btn-secondary'
          >
            Add an answer
          </button>
        </div>

        <div className='form-group'>
          <label htmlFor='answersLayout'>Answers layout:</label>

          <div className='form-check'>
            <input
              name='answersLayout'
              id='vertical'
              type='radio'
              value={0}
              checked={+data.answersLayout === 0}
              onChange={handleChange}
              className='form-check-input'
            />

            <label htmlFor='vertical' className='form-check-label'>
              Vertical
            </label>
          </div>

          <div className='form-check'>
            <input
              name='answersLayout'
              id='horizontal'
              type='radio'
              value={1}
              checked={data.answersLayout == 1}
              onChange={handleChange}
              className='form-check-input'
            />

            <label htmlFor='horizontal' className='form-check-label'>
              Horizontal
            </label>
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='tags'>Tags:</label>

          <input
            name='tags'
            id='tags'
            type='text'
            value={data.tags}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        {error && <div className='alert alert-danger'>{error}</div>}

        <button type='button' className='btn btn-outline-primary pull-right'>
          Show
        </button>

        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
