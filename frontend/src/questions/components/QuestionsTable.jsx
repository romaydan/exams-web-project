import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

function QuestionsTable(props) {
  const columns = [
    { path: 'text', label: 'Question Text' },
    { path: 'lastUpdate', label: 'Last Update' },
    { path: 'type', label: 'Question Type' },
    { path: 'numberOfTests', label: '# of Tests' },
    {
      key: 'edit',
      content: (question) => (
        <Link
          to={`/questions/${question._id}`}
          className="btn btn-warning btn-sm"
        >
          Edit
        </Link>
      ),
    },
    {
      key: 'delete',
      content: (question) => (
        <button
          onClick={() => props.onDelete(question)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    props.onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    const { sortColumn } = props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.path === 'lastUpdate')
      return new Date(_.get(item, column.path)).toLocaleDateString();

    if (column.path === 'type')
      return _.get(item, column.path) === 0 ? 'Single' : 'Multiple';

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.questions.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

QuestionsTable.propTypes = {
  questions: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default QuestionsTable;
