import TableBody from './tableBody'
import TableHeader from './tableHeader'
import { Table } from 'react-bootstrap'

function MyTable({ movies, columns, onSort, sortColumn }) {
  return (
    <Table bordered hover>
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody movies={movies} columns={columns} />
    </Table>
  )
}

export default MyTable
