import { Link } from 'react-router-dom';

function Organizations(props) {
  const { options, setOrganization } = props;

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const newOrganization = options[input.value];

    setOrganization(newOrganization);
  };

  return (
    <div>
      <h1>Select an organization</h1>

      <div className="form-group">
        <label htmlFor="organization">
          Select an organization and click the "Open Menu" button:
        </label>

        <select
          name="organization"
          id="organization"
          onChange={handleChange}
          className="form-control"
        >
          <option value="" />
          {options &&
            options.map((option, index) => (
              <option key={option._id} value={index}>
                {option.name}
              </option>
            ))}
        </select>
      </div>

      <Link to="/main-menu" className="btn btn-primary">
        Open Menu
      </Link>
    </div>
  );
}

export default Organizations;
