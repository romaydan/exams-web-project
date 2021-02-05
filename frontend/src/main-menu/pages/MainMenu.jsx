function MainMenu(props) {
  const { fieldOfStudy, setFieldOfStudy, options } = props;

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const newFieldOfStudy = options.find((o) => o.name === input.value);

    setFieldOfStudy(newFieldOfStudy);
  };

  return (
    <div>
      <h1>Main Menu</h1>

      <div className="form-group">
        <label htmlFor="fieldOfStudy">Choose a field of study:</label>

        <select
          name="fieldOfStudy"
          id="fieldOfStudy"
          value={fieldOfStudy && fieldOfStudy.name}
          onChange={handleChange}
          className="form-control"
        >
          <option value="" />
          {options &&
            options.map((option) => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <button
          disabled={!fieldOfStudy}
          onClick={() => props.history.push('/questions')}
          className="btn btn-primary"
        >
          Manage Questions &raquo;
        </button>
      </div>

      <div>
        <button
          disabled={!fieldOfStudy}
          onClick={() => props.history.push('/exams')}
          className="btn btn-primary my-3"
        >
          Manage Exams &raquo;
        </button>
      </div>

      <div>
        <button
          disabled={!fieldOfStudy}
          onClick={() => props.history.push('/reports/exam')}
          className="btn btn-primary my-3"
        >
          Reports By Exam &raquo;
        </button>
      </div>

      <div>
        <button
          disabled={!fieldOfStudy}
          onClick={() => props.history.push('/reports/respondent')}
          className="btn btn-primary"
        >
          Reports By Respondent &raquo;
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
