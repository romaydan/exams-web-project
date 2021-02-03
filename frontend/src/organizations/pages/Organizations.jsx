function Organizations(props) {
  const { options, organization, setOrganization } = props;

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const newOrganization = options.find((o) => o.name === input.value);

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
          value={organization && organization.name}
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

      <button
        disabled={!organization}
        onClick={() => props.history.push('/main-menu')}
        className="btn btn-primary"
      >
        Open Menu &raquo;
      </button>
    </div>
  );
}

export default Organizations;
