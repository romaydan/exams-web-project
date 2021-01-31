import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

const RespondentsTable = (props) => {
  const { respondents, setRespondent } = props;

  const columns = [
    { path: 'firstName', label: 'Respondent' },
    { path: 'email', label: 'Email' },
  ];

  const renderCell = (item, column) => {
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
