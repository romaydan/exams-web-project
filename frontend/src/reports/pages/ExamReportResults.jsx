import { useState, useEffect } from 'react';

import ExamSummary from '../components/ExamSummary';
import ExamInstancesTable from '../components/ExamInstancesTable';
import QuestionsTable from '../components/QuestionsTable';

import { getExam } from '../../shared/services/examService';
import { getExamInstances } from '../../shared/services/examInstanceService';

function ExamReportResults(props) {
  const [exam, setExam] = useState();
  const [examInstances, setExamInstances] = useState([]);

  useEffect(() => {
    async function populateExamInstances() {
      try {
        const { data: examData } = await getExam(props.match.params.id);
        const params = new URLSearchParams(props.location.search);
        const { data: examInstancesData } = await getExamInstances(examData, {
          startDate: params.get('from'),
          endDate: params.get('to'),
        });

        setExam(examData);
        setExamInstances(examInstancesData);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.replace('/not-found');
      }
    }

    populateExamInstances();
  }, [props.history, props.match.params.id, props.location.search]);

  const handleExamInstanceClick = (id) => {
    props.history.push(`/reports/respondent/${id}`);
  };

  return (
    <div>
      {exam && (
        <>
          <h1>
            Test Report:<span className="text-primary">{` ${exam.name}`}</span>
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

          <br />

          <h3>Question Statistics</h3>

          <QuestionsTable
            questions={exam.questions}
            examInstances={examInstances}
          />
        </>
      )}

      <button onClick={props.history.goBack} className="btn btn-primary">
        &laquo; Back
      </button>
    </div>
  );
}

export default ExamReportResults;
