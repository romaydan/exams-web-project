import PropTypes from 'prop-types';

const SummaryCol = (props) => {
  const { column, renderCell } = props;

  return (
    <p>
      {column.label}:{' '}
      <span className="font-weight-bold">{renderCell(column)}</span>
    </p>
  );
};

SummaryCol.propTypes = {
  column: PropTypes.object.isRequired,
  renderCell: PropTypes.func.isRequired,
};

export default SummaryCol;
