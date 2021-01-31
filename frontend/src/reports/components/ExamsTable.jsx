import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

const ExamsTable = (props) => {
  const { exams } = props;

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
    <Table striped bordered hover size="sm">
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
            // onClick={}
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
};

export default ExamsTable;
