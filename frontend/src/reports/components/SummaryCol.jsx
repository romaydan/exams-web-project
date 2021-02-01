import PropTypes from 'prop-types';

const SummaryCol = (props) => {
  const { column, renderCell } = props;

  return (
    <p>
      {column.label}:{' '}
      <span style={{ fontWeight: 'bold' }}>{renderCell(column)}</span>
    </p>
  );
};

SummaryCol.propTypes = {
  column: PropTypes.object.isRequired,
  renderCell: PropTypes.func.isRequired,
};

export default SummaryCol;
