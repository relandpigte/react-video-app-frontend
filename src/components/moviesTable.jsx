import MyTable from './common/myTable'
import auth from '../services/authService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MoviesTable({ movies, onLike, onDelete, onSort, sortColumn }) {
  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <FontAwesomeIcon
          icon={faHeart}
          style={{ cursor: 'pointer', color: movie.liked ? 'red' : 'gray' }}
          onClick={() => onLike(movie)}
        />
      ),
    },
  ]

  const deleteColumn = {
    key: 'delete',
    content: (movie) => (
      <Button size="sm" variant="danger" onClick={() => onDelete(movie)}>
        Delete
      </Button>
    ),
  }

  if (auth.currentUser?.isAdmin) columns.push(deleteColumn)

  return (
    <MyTable
      columns={columns}
      movies={movies}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  )
}

export default MoviesTable
