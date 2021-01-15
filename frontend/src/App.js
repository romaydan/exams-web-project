import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import Questions from './questions/pages/Questions';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/questions" component={Questions} />
          <Redirect from="/" exact to="/questions" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
