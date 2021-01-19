import { useEffect, useState } from 'react';
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

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const newData = { ...data };

    newData[name] = value;
    setData(newData);
  };

  const handlePossibleAnswerChange = ({ currentTarget }) => {
    const { id, name, value, checked } = currentTarget;
    const newData = { ...data };

    newData.possibleAnswers[id][name] = name === 'answer' ? value : checked;
    setData(newData);
  };

  const deletePossibleAnswer = (possibleAnswer) => {
    const newData = { ...data };
    const index = newData.possibleAnswers.indexOf(possibleAnswer);

    newData.possibleAnswers.splice(index, 1);
    setData(newData);
  };

  const addPossibleAnswer = () => {
    const newData = { ...data };

    newData.possibleAnswers.push({ answer: '', isCorrect: false });
    setData(newData);
  };

  return (
    <div>
      <h1>Question Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Question type:</label>
          <select
            value={data.type}
            name="type"
            id="type"
            className="form-control"
            onChange={handleChange}
          >
            <option value={0}>Single Choice Question</option>
            <option value={1}>Multiple Selection Question</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="text">Question text:</label>
          <textarea
            value={data.text}
            name="text"
            id="text"
            className="form-control"
            onChange={handleChange}
            cols="30"
            rows="2"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="textBelow">Text below question:</label>
          <textarea
            value={data.textBelow}
            name="textBelow"
            id="textBelow"
            className="form-control"
            onChange={handleChange}
            cols="30"
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="possibleAnswers">Possible answers:</label>
          {data.possibleAnswers.map((a) => (
            <div
              className="form-group"
              key={a._id || data.possibleAnswers.indexOf(a)}
            >
              <div className="form-inline">
                <button
                  type="button"
                  className="btn btn-danger btn-sm mr-2"
                  onClick={(a) => deletePossibleAnswer(a)}
                >
                  X
                </button>
                <textarea
                  value={a.answer}
                  name="answer"
                  id={data.possibleAnswers.indexOf(a)}
                  className="form-control mr-2"
                  onChange={handlePossibleAnswerChange}
                  cols="30"
                  rows="1"
                ></textarea>
                <div className="form-check">
                  <input
                    checked={a.isCorrect}
                    type="checkbox"
                    name="isCorrect"
                    id={data.possibleAnswers.indexOf(a)}
                    className="form-check-input"
                    onChange={handlePossibleAnswerChange}
                  />
                  {a.isCorrect ? 'Correct' : 'Incorrect'}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addPossibleAnswer}
          >
            Add an answer
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="answersLayout">Answers layout:</label>
          <div className="form-check">
            <input
              value={0}
              checked={data.answersLayout == 0}
              type="radio"
              name="answersLayout"
              id="vertical"
              className="form-check-input"
              onChange={handleChange}
            />
            <label htmlFor="vertical" className="form-check-label">
              Vertical
            </label>
          </div>
          <div className="form-check">
            <input
              value={1}
              checked={data.answersLayout == 1}
              type="radio"
              name="answersLayout"
              id="horizontal"
              className="form-check-input"
              onChange={handleChange}
            />
            <label htmlFor="horizontal" className="form-check-label">
              Horizontal
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            value={data.tags}
            type="text"
            name="tags"
            id="tags"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
