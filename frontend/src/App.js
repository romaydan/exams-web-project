import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './shared/components/NavBar';
import RegisterForm from './auth/pages/RegisterForm';
import LoginForm from './auth/pages/LoginForm';
import Logout from './auth/components/Logout';
import ProtectedRoute from './shared/components/ProtectedRoute';
import Organizations from './organizations/pages/Organizations';
import MainMenu from './main-menu/pages/MainMenu';
import QuestionForm from './questions/pages/QuestionForm';
import Questions from './questions/pages/Questions';
import CreateEditExam from './exams/pages/CreateEditExam/CreateEditExam';
import Exams from './exams/pages/Exams/Exams';
import ExamReportResults from './reports/pages/ExamReportResults';
import ExamReport from './reports/pages/ExamReport';
import RespondentReportResults from './reports/pages/RespondentReportResults';
import RespondentReport from './reports/pages/RespondentReport';
import StudentExamResult from './exams/pages/StudentExamResult/StudentExamResult';
import StudentExam from './exams/pages/StudentExam/StudentExam';
import StudentForm from './exams/pages/StudentForm/StudentForm';
import NotFound from './shared/components/NotFound';

import auth from './shared/services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [admin, setAdmin] = useState();
  const [organization, setOrganization] = useState();
  const [fieldOfStudy, setFieldOfStudy] = useState();

  useEffect(() => {
    const currentAdmin = auth.getCurrentAdmin();
    setAdmin(currentAdmin);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar admin={admin} organization={organization} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute
            path="/organizations"
            render={(props) => (
              <Organizations
                {...props}
                organization={organization}
                setOrganization={setOrganization}
                options={admin && admin.organizations}
              />
            )}
          />
          <ProtectedRoute
            path="/main-menu"
            render={(props) => (
              <MainMenu
                {...props}
                fieldOfStudy={fieldOfStudy}
                setFieldOfStudy={setFieldOfStudy}
                options={organization && organization.fieldsOfStudy}
              />
            )}
          />
          <ProtectedRoute
            path="/questions/:id"
            render={(props) => (
              <QuestionForm {...props} fieldOfStudy={fieldOfStudy} />
            )}
          />
          <ProtectedRoute
            path="/questions"
            render={(props) => (
              <Questions {...props} fieldOfStudy={fieldOfStudy} />
            )}
          />
          <ProtectedRoute
            path="/exams/new"
            render={(props) => (
              <CreateEditExam {...props} fieldOfStudy={fieldOfStudy} />
            )}
          />
          <ProtectedRoute
            path="/exams/edit/:id"
            render={(props) => (
              <CreateEditExam {...props} fieldOfStudy={fieldOfStudy} />
            )}
          />
          <ProtectedRoute
            exact
            path="/exams"
            render={(props) => <Exams {...props} fieldOfStudy={fieldOfStudy} />}
          />
          <ProtectedRoute
            path="/reports/exam/:id"
            render={(props) => (
              <ExamReportResults {...props} fieldOfStudy={fieldOfStudy} />
            )}
          />
          <ProtectedRoute
            path="/reports/exam"
            render={(props) => (
              <ExamReport {...props} fieldOfStudy={fieldOfStudy} />
            )}
          />
          <ProtectedRoute
            path="/reports/respondent/:id"
            component={RespondentReportResults}
          />
          <ProtectedRoute
            path="/reports/respondent"
            component={RespondentReport}
          />
          <Route
            path="/exams/:examId/:studentId/result"
            component={StudentExamResult}
          />
          <Route path="/exams/:examId/:studentId" component={StudentExam} />
          <Route path="/exams/:examId" component={StudentForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/main-menu" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
