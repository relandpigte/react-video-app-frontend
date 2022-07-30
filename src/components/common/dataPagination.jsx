import { Pagination } from 'react-bootstrap'
import { PropTypes } from 'prop-types'

function DataPagination({
  currentPage,
  pageSize,
  onPageChange,
  totalData,
  onNext,
  onPrev,
}) {
  const numPages = Math.ceil(totalData / pageSize)
  if (numPages === 1) return

  const pages = [...Array(numPages).keys()]

  return (
    <Pagination>
      {currentPage > 1 && <Pagination.Prev onClick={onPrev} />}
      {pages?.map((page) => (
        <Pagination.Item
          active={currentPage === ++page}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {currentPage < numPages && <Pagination.Next onClick={onNext} />}
    </Pagination>
  )
}

DataPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default DataPagination
