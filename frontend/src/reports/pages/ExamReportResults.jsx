import { useEffect, useState } from 'react';

import ExamSummary from '../components/ExamSummary';

import { getExam } from '../../shared/services/examService';
import { getExamInstances } from '../../shared/services/examInstanceService';
import ExamInstancesTable from '../components/ExamInstancesTable';

function ExamReportResults(props) {
  const [exam, setExam] = useState({});
  const [examInstances, setExamInstances] = useState([]);

  useEffect(() => {
    async function populateExamInstances() {
      try {
        const { data: examData } = await getExam(props.match.params.id);
        const { data: examInstancesData } = await getExamInstances(examData);

        setExam(examData);
        setExamInstances(examInstancesData);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace('/not-found');
      }
    }

    populateExamInstances();
  }, [props.history, props.match.params.id]);

  const handleExamInstanceClick = (id) => {
    props.history.push(`/reports/respondent/${id}`);
  };

  return (
    <div>
      <h1>
        Test Report:<span style={{ color: '#007bff' }}>{` ${exam.name}`}</span>
      </h1>

      <br />

      <ExamSummary exam={exam} examInstances={examInstances} />

      <br />

      <h3>Respondent Grades And Answers</h3>

      <p>Click a name from the list to see the respondent's test</p>

      <ExamInstancesTable
        examInstances={examInstances}
        onClick={handleExamInstanceClick}
      />

      <button onClick={props.history.goBack} className="btn btn-primary">
        &laquo; Back
      </button>
    </div>
  );
}

export default ExamReportResults;
