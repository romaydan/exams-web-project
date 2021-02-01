import { useEffect, useState } from 'react';

import Summary from '../components/Summary';
import Details from '../components/Details';

import { getExamInstance } from '../../shared/services/examInstanceService';

function RespondentReportResults(props) {
  const [examInstance, setExamInstance] = useState();

  useEffect(() => {
    async function populateExamInstance() {
      try {
        const { data } = await getExamInstance(props.match.params.id);

        setExamInstance(data);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace('/not-found');
      }
    }

    populateExamInstance();
  }, [props.history, props.match.params.id]);

  return (
    <div>
      {examInstance && (
        <>
          <h1>Test results for {examInstance.exam.name}</h1>

          <h3>
            Respondent: {examInstance.student.firstName}{' '}
            {examInstance.student.lastName}
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
