import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFound from './components/notFound';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Questions from './components/questions';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/questions" component={Questions} />
          <Route path="not-found" component={NotFound} />
          <Redirect from="/" exact to="/questions" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
