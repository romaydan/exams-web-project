import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import SummaryCol from './SummaryCol';

const ExamInstanceSummary = (props) => {
  const { examInstance } = props;

  const columns = [
    { path: 'exam.name', label: 'Test Name' },
    { path: 'submitDate', label: 'Last Submitted' },
    {
      path: 'answeredQuestions.length',
      label: 'Number Of Questions Submitted',
    },
    { path: 'rightQuestions', label: 'Number Of Correct Answers' },
    { path: 'grade', label: 'Final Grade' },
    { path: 'exam.questions.length', label: 'Number Of Questions' },
    { path: 'status', label: 'Status' },
    { path: 'exam.passingGrade', label: 'Passing Grade' },
  ];

  const renderCell = (column) => {
    switch (column.path) {
      case 'submitDate':
        return new Date(_.get(examInstance, column.path)).toLocaleString();
      case 'status':
        return _.get(examInstance, 'grade') >=
          _.get(examInstance, 'exam.passingGrade')
          ? 'Passed'
          : 'Failed';
      default:
        return _.get(examInstance, column.path);
    }
  };

  return (
    <div>
      <h3>Summary</h3>

      <Row>
        <Col>
          {columns.map(
            (column, index) =>
              index % 2 === 0 && (
                <SummaryCol column={column} renderCell={renderCell} />
              )
          )}
        </Col>

        <Col>
          {columns.map(
            (column, index) =>
              index % 2 !== 0 && (
                <SummaryCol column={column} renderCell={renderCell} />
              )
          )}
        </Col>
      </Row>
    </div>
  );
};

ExamInstanceSummary.propTypes = {
  examInstance: PropTypes.object.isRequired,
};

export default ExamInstanceSummary;
