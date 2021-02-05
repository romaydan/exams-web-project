import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

const ExamsTable = (props) => {
  const { exams, onClick } = props;

  const columns = [
    { path: 'exam.name', label: 'Test Name' },
    { path: 'grade', label: 'Grade' },
    { path: 'submitDate', label: 'Last Activity' },
  ];

  const renderCell = (item, column) => {
    if (column.path === 'submitDate')
      return new Date(_.get(item, column.path)).toLocaleDateString();

    return _.get(item, column.path);
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
        {exams.map((item) => (
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

ExamsTable.propTypes = {
  exams: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ExamsTable;
