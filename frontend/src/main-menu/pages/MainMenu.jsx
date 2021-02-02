import { Link } from 'react-router-dom';

function MainMenu(props) {
  const { options, fieldOfStudy, setFieldOfStudy } = props;

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
        <Link to="/questions" className="btn btn-primary">
          Manage Questions &raquo;
        </Link>
      </div>

      <div>
        <Link to="/exams" className="btn btn-primary my-3">
          Manage Exams &raquo;
        </Link>
      </div>

      <div>
        <Link to="/reports/exam" className="btn btn-primary">
          Reports &raquo;
        </Link>
      </div>
    </div>
  );
}

export default MainMenu;
