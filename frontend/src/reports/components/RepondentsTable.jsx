import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

const RespondentsTable = (props) => {
  const { respondents, setRespondent } = props;

  const columns = [
    { path: 'respondent', label: 'Respondent' },
    { path: 'email', label: 'Email' },
    { path: 'lastActivity', label: 'Last Activity' },
  ];

  const renderCell = (item, column) => {
    switch (column.path) {
      case 'respondent':
        return _.get(item, 'firstName').concat(' ', _.get(item, 'lastName'));
      case 'lastActivity':
        return new Date(
          _.get(item, `exams[${item.exams.length - 1}].submitDate`)
        ).toLocaleDateString();
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
        {respondents.map((item) => (
          <tr
            key={item._id}
            onClick={() => setRespondent(item)}
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

RespondentsTable.propTypes = {
  respondents: PropTypes.array.isRequired,
  setRespondent: PropTypes.func.isRequired,
};

export default RespondentsTable;
