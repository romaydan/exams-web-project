import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFound from './components/notFound';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
