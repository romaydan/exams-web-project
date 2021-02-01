import { useEffect, useState } from 'react';

import Summary from '../components/Summary';
import Details from '../components/Details';

import { getStudent } from '../../shared/services/studentService';

function RespondentReportResults(props) {
  const [student, setStudent] = useState({});
  const [examInstance, setExamInstance] = useState();

  useEffect(() => {
    async function populateStudent() {
      try {
        const studentId = props.match.params.studentId;
        const examId = props.match.params.examId;

        const { data: studentData } = await getStudent(studentId);
        setStudent(studentData);

        const examInstanceData = student.exams.find((e) => e._id === examId);
        setExamInstance(examInstanceData);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace('/not-found');
      }
    }

    populateStudent();
  }, [props.history, props.match.params, student]);

  return (
    <div>
      {examInstance && (
        <>
          <h1>Test results for {examInstance.exam.name}</h1>

          <h3>
            Respondent: {student.firstName} {student.lastName}
          </h3>

          <br />

          <Summary examInstance={examInstance} />

          <br />

          <Details answeredQuestions={examInstance.answeredQuestions} />
        </>
      )}

      <button onClick={props.history.goBack} className="btn btn-primary my-3">
        Back
      </button>
    </div>
  );
}

export default RespondentReportResults;
