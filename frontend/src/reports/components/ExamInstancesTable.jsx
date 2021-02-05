import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

const ExamInstancesTable = (props) => {
  const { examInstances, onClick } = props;

  const columns = [
    { path: 'respondent', label: 'Respondent' },
    { path: 'submitDate', label: 'Submitted' },
    { path: 'answeredQuestions.length', label: 'Number of Questions Answered' },
    { path: 'grade', label: 'Grade' },
  ];

  const renderCell = (item, column) => {
    switch (column.path) {
      case 'respondent':
        return _.get(item, 'student.firstName').concat(
          ' ',
          _.get(item, 'student.lastName')
        );
      case 'submitDate':
        return new Date(_.get(item, column.path)).toLocaleDateString();
      default:
        return _.get(item, column.path);
    }
  };

  const createKey = (item, column) => {
    return item._id + column.path;
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.path}>{column.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {examInstances.map((item) => (
          <tr
            key={item._id}
            onClick={() => onClick(item._id)}
            className="clickable"
          >
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ExamInstancesTable.propTypes = {
  examInstances: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExamInstancesTable;
