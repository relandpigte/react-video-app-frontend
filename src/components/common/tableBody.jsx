import _ from 'lodash'

function TableBody(props) {
  const { movies, columns } = props

  const renderCell = (movie, column) => {
    if (column.content) return column.content(movie)
    return _.get(movie, column.path)
  }

  return (
    <tbody>
      {movies.map((movie) => (
        <tr key={movie._id}>
          {columns.map((column) => (
            <td key={column.path ?? column.key}>{renderCell(movie, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
