import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import QuestionForm from './questions/pages/QuestionForm';
import Questions from './questions/pages/Questions';
import NotFound from './shared/components/NotFound';
import NewExam from './exams/pages/NewExam/NewExam';
import NavBar from './shared/components/NavBar';
import Exams from './exams/pages/Exams/Exams';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/questions/:id" component={QuestionForm} />
          <Route path="/questions" component={Questions} />
          <Route path="/exams/new" component={NewExam} />
          <Route path="/exams" component={Exams} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/questions" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
