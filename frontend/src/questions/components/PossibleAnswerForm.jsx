import PropTypes from 'prop-types';

const PossibleAnswerForm = (props) => {
  const { possibleAnswer, index, handleChange, deletePossibleAnswer } = props;

  return (
    <div className="form-group">
      <div className="form-inline">
        <button
          type="button"
          onClick={() => deletePossibleAnswer(index)}
          className="btn btn-danger btn-sm"
        >
          X
        </button>

        <textarea
          name="answer"
          id={index}
          cols="60"
          rows="1"
          value={possibleAnswer.answer}
          onChange={handleChange}
          className="form-control mx-2"
        ></textarea>

        <div className="form-check">
          <input
            name="isCorrect"
            id={index}
            type="checkbox"
            checked={possibleAnswer.isCorrect}
            onChange={handleChange}
            className="form-check-input"
          />

          <label htmlFor={index} className="form-check-label">
            {possibleAnswer.isCorrect ? 'Correct' : 'Incorrect'}
          </label>
        </div>
      </div>
    </div>
  );
};

PossibleAnswerForm.propTypes = {
  possibleAnswer: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  deletePossibleAnswer: PropTypes.func.isRequired,
};

export default PossibleAnswerForm;
