import { Route, Redirect } from 'react-router-dom';

import auth from '../services/authService';

const ProtectedRoute = (props) => {
  const { path, component: Component, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentAdmin()) return <Redirect to="/login" />;

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
