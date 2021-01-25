import { useEffect } from 'react';

import auth from '../../shared/services/authService';

const Logout = (props) => {
  useEffect(() => {
    auth.logout();

    window.location = '/';
  }, []);

  return null;
};

export default Logout;
