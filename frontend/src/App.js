import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import QuestionForm from './questions/components/QuestionForm';
import Questions from './questions/pages/Questions';
import NewExam from './exams/pages/NewExam/NewExam';
import NotFound from './shared/components/NotFound';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NewExam from './exams/pages/NewExam/NewExam.jsx'
import Exams from './exams/pages/Exams/Exams';
function App() {
  return (
    <Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/questions/:id" component={QuestionForm} />
          <Route path="/questions" component={Questions} />
          <Route path="/exams/new" component={NewExam} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/questions" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
