import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Table } from 'react-bootstrap';

const QuestionsTable = (props) => {
  const { questions, sortColumn, onDelete, onSort } = props;

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
          className='btn btn-warning btn-sm'
        >
          Edit
        </Link>
      ),
    },
    {
      key: 'delete',
      content: (question) => (
        <button
          disabled={question.numberOfTests > 0}
          onClick={() => onDelete(question)}
          className='btn btn-danger btn-sm'
        >
          Delete
        </button>
      ),
    },
  ];

  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };

    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      newSortColumn.path = path;
      newSortColumn.order = 'asc';
    }

    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;

    return <i className='fa fa-sort-desc'></i>;
  };

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.path === 'text') {
      return _.truncate(_.get(item, column.path), { length: 50 });
    }

    if (column.path === 'lastUpdate')
      return new Date(_.get(item, column.path)).toLocaleDateString();

    if (column.path === 'type')
      return _.get(item, column.path) === 0 ? 'Single' : 'Multiple';

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const createTitle = (item, column) => {
    if (item.text.length > 50 && column.path === 'text') return item.text;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
              className='clickable'
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {questions.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td
                key={createKey(item, column)}
                title={createTitle(item, column)}
              >
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

QuestionsTable.propTypes = {
  questions: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default QuestionsTable;
