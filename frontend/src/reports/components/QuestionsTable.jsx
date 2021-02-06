import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

const QuestionsTable = (props) => {
  const { questions, examInstances } = props;

  const columns = [
    { path: 'text', label: 'Question' },
    { path: 'numberOfSubmissions', label: 'Number Of Submissions' },
    { path: 'percentageAnsweredCorrectly', label: '% Answered Correctly' },
  ];

  const renderCell = (item, column) => {
    const submissions = examInstances.filter((examI) =>
      examI.answeredQuestions.some(
        (answeredQ) => answeredQ.question === item._id
      )
    ).length;
    const answeredCorrectly = examInstances.filter((examI) =>
      examI.answeredQuestions.some(
        (answeredQ) =>
          answeredQ.question === item._id &&
          answeredQ.answers.every((a) => a.isCorrect)
      )
    ).length;

    switch (column.path) {
      case 'numberOfSubmissions':
        return submissions;
      case 'percentageAnsweredCorrectly':
        return ((answeredCorrectly / submissions) * 100).toFixed() + '%';
      default:
        return _.get(item, column.path);
    }
  };

  const createKey = (item, column) => {
    return item._id + column.path;
  };

  return (
    <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.path}>{column.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {questions.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

QuestionsTable.propTypes = {
  questions: PropTypes.array.isRequired,
  examInstances: PropTypes.array.isRequired,
};

export default QuestionsTable;
