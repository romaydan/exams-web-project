import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import auth from '../../shared/services/authService';

function LoginForm(props) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.login(data.email, data.password);

      window.location = '/organizations';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) setError(ex.response.data);
    }
  };

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const newData = { ...data };

    newData[input.name] = input.value;
    setData(newData);
  };

  if (auth.getCurrentAdmin()) return <Redirect to="/" />;

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            name="email"
            id="email"
            type="text"
            value={data.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            name="password"
            id="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
