import PropTypes from 'prop-types';
import _ from 'lodash';

import { DropdownButton, Dropdown } from 'react-bootstrap';

const Pagination = (props) => {
  const {
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
    setPageSize,
  } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}

        <DropdownButton id="dropdown-basic-button" title="Item per page">
          <Dropdown.Item onClick={() => setPageSize(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => setPageSize(10)}>10</Dropdown.Item>
        </DropdownButton>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default Pagination;
