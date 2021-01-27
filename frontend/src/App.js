import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import RegisterForm from './auth/pages/RegisterForm';
import LoginForm from './auth/pages/LoginForm';
import Logout from './auth/components/Logout';
import ProtectedRoute from './shared/components/ProtectedRoute';
import QuestionForm from './questions/pages/QuestionForm';
import Questions from './questions/pages/Questions';
import NavBar from './shared/components/NavBar';
import NotFound from './shared/components/NotFound';
import NewExam from './exams/pages/NewExam/NewExam';
import Exams from './exams/pages/Exams/Exams';
import StudentForm from './exams/pages/StudentForm/StudentForm';
import DoExam from './exams/pages/DoExam/DoExam';

import auth from './shared/services/authService';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ExamResult from './exams/pages/ExamResult/ExamResult';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const currentAdmin = auth.getCurrentAdmin();
    setAdmin(currentAdmin);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar admin={admin} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/questions/:id" component={QuestionForm} />
          <ProtectedRoute path="/questions" component={Questions} />
          <Route path="/exams/new" component={NewExam} />
          <Route path="/exams/edit/:id" component={NewExam} />
          <Route path="/exams/:examId/:studentId/result" component={ExamResult} />
          <Route path="/exams/:examId/:studentId" component={DoExam} />
          <Route path="/exams/:examId" component={StudentForm} />
          <Route path="/exams" component={Exams} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/questions" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
