import PropTypes from 'prop-types';
import _ from 'lodash';

function Pagination(props) {
  const pagesCount = Math.ceil(props.itemsCount / props.pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === props.currentPage ? 'page-item active' : 'page-item'
            }
          >
            <button
              className="page-link"
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
