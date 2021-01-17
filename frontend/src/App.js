import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import Questions from './questions/pages/Questions';
import NewExam from './exams/pages/NewExam/NewExam';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Exams from './exams/pages/Exams/Exams';
function App() {
  return (
    <Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/exams/new" component={NewExam} />
          <Route path="/exams" component={Exams} />
          <Route path="/questions" component={Questions} />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
