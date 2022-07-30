import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDesc, faSortAsc } from '@fortawesome/free-solid-svg-icons'

function TableHeader({ columns, onSort, sortColumn }) {
  const sortMovies = (column) => {
    if (column.path === undefined) return

    const sortCol = { ...sortColumn }
    if (sortCol.path === column.path) {
      sortCol.order = sortCol.order === 'asc' ? 'desc' : 'asc'
    } else {
      sortCol.path = column.path
      sortCol.order = 'asc'
    }

    onSort(sortCol)
  }

  const renderSortIcon = (column) => {
    const sortCol = { ...sortColumn }
    if (sortCol.path !== column.path) return

    return (
      <FontAwesomeIcon
        icon={sortCol.order === 'asc' ? faSortAsc : faSortDesc}
      />
    )
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path ?? column.key}
            onClick={() => sortMovies(column)}
            style={{ cursor: 'pointer' }}
          >
            {column.label} {column.path && renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
