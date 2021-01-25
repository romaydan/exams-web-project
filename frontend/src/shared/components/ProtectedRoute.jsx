import { Redirect, Route } from 'react-router-dom';

import auth from '../services/authService';

const ProtectedRoute = (props) => {
  const { path, component: Component, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentAdmin())
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
