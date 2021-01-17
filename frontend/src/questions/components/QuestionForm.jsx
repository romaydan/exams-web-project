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
    possibleAnswers: [],
    answersLayout: 0,
    tags: [],
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
      tags: question.tags,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveQuestion(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
        return;
      }
    }

    props.history.push('/questions');
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.currentTarget.name] = e.currentTarget.value;
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
            <textarea
              key={a._id}
              value={a.answer}
              name={`possibleAnswers[${data.possibleAnswers.indexOf(
                a
              )}].answer`}
              id="possibleAnswers"
              className="form-control"
              onChange={handleChange}
              cols="30"
              rows="1"
            ></textarea>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            value={
              data.tags.length > 0 && data.tags.reduce((a, c) => a + ', ' + c)
            }
            type="text"
            name="tags"
            id="tags"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default QuestionForm;
