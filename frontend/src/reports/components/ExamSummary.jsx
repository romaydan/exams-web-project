import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import SummaryCol from './SummaryCol';

import {
  calculateAverageGrade,
  calculateMedianGrade,
} from '../../shared/utils/calculate';

const ExamSummary = (props) => {
  const { exam, examInstances } = props;

  const columns = [
    { path: 'name', label: 'Test name' },
    { path: 'numberOfSubmissions', label: 'Number of submissions' },
    {
      path: 'numberOfRespondentsPassed',
      label: 'Number of respondents passed',
    },
    { path: 'passingPercentage', label: 'Passing percentage' },
    { path: 'questions.length', label: 'Number Of Questions' },
    { path: 'averageGrade', label: 'Average grade' },
    { path: 'passingGrade', label: 'Passing Grade' },
    { path: 'medianGrade', label: 'Median grade' },
  ];

  const renderCell = (column) => {
    const submissions = examInstances.length;
    const respondentsPassed = examInstances.filter(
      (e) => e.grade >= exam.passingGrade
    ).length;

    switch (column.path) {
      case 'numberOfSubmissions':
        return submissions;
      case 'numberOfRespondentsPassed':
        return respondentsPassed;
      case 'passingPercentage':
        return ((respondentsPassed / submissions) * 100).toFixed() + '%';
      case 'averageGrade':
        return calculateAverageGrade(examInstances);
      case 'medianGrade':
        return calculateMedianGrade(examInstances);
      default:
        return _.get(exam, column.path);
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

ExamSummary.propTypes = {
  exam: PropTypes.object.isRequired,
  examInstances: PropTypes.array.isRequired,
};

export default ExamSummary;
