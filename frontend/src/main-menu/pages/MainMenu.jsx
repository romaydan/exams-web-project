import { Link } from 'react-router-dom';

function MainMenu(props) {
  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const newFieldOfStudy = props.options[input.value];

    props.setFieldOfStudy(newFieldOfStudy);
  };

  return (
    <div>
      <h1>Main Menu</h1>

      <div className="form-group">
        <label htmlFor="fieldOfStudy">Choose a field of study:</label>

        <select
          name="fieldOfStudy"
          id="fieldOfStudy"
          onChange={handleChange}
          className="form-control"
        >
          <option value="" />
          {props.options &&
            props.options.map((option, index) => (
              <option key={option._id} value={index}>
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
        <Link to="/reports" className="btn btn-primary">
          Reports &raquo;
        </Link>
      </div>
    </div>
  );
}

export default MainMenu;
