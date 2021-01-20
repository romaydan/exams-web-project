function PossibleAnswerForm(props) {
  const { possibleAnswer, index, handleChange, handleDelete } = props;

  return (
    <div className="form-group">
      <div className="form-inline">
        <button
          type="button"
          onClick={() => handleDelete(possibleAnswer)}
          className="btn btn-danger btn-sm mr-2"
        >
          X
        </button>

        <textarea
          name="answer"
          id={index}
          rows="1"
          value={possibleAnswer.answer}
          onChange={handleChange}
          className="form-control mr-2"
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
}

export default PossibleAnswerForm;
