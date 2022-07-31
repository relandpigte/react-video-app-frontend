import _ from 'lodash'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { deleteMovie, getMovies } from '../services/movieServices'
import { getGenres } from '../services/genreService'
import { Outlet, Link } from 'react-router-dom'
import { Paginate } from '../utils/paginate'
import { toast } from 'react-toastify'
import { useUserContext } from '../context/userContext'
import Sidebar from '../components/sidebar'
import MoviesTable from '../components/moviesTable'
import DataPagination from '../components/common/dataPagination'
import SearchBox from '../components/common/searchBox'

function Movies() {
  const { currentUser } = useUserContext()
  const [data, setData] = useState({
    movies: [],
    genres: [],
    selectedGenre: null,
    currentPage: 1,
    searchQuery: '',
    pageSize: 4,
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
  })

  const pageSize = 4

  useEffect(() => {
    async function fetchData() {
      const { data: genres } = await getGenres()
      const { data: movies } = await getMovies()

      setData((prev) => ({
        ...prev,
        genres: [{ _id: '', name: 'All Genre' }, ...genres],
        movies: movies,
      }))
    }

    fetchData()
  }, [])

  const handleDelete = async (movie) => {
    const { movies } = data
    const originalMovies = movies

    setData({
      ...data,
      movies: originalMovies.filter((m) => m._id !== movie._id),
    })

    try {
      await deleteMovie(movie._id)
      toast.success(`Movie ${movie.title} deleted.`)
    } catch (ex) {
      if (ex.response?.status === 404)
        toast.error('This movie has already been deleted.')

      setData({ ...data, movies: originalMovies })
    }
  }

  const handleLike = (movie) => {
    const { movies } = data
    const likedMovies = [...movies]
    const index = likedMovies.indexOf(movie)
    likedMovies[index].liked = !likedMovies[index].liked

    setData({ ...data, movies: likedMovies })
  }

  const handleSelectGenre = (genre) => {
    setData({ ...data, selectedGenre: genre, currentPage: 1 })
  }

  const handleSort = (sortColumn) => {
    setData({ ...data, sortColumn })
  }

  const handlePageChange = (page) => {
    if (page === data.currentPage) return
    setData({ ...data, currentPage: page })
  }

  const handleNext = () => {
    setData({ ...data, currentPage: data.currentPage + 1 })
  }

  const handlePrevious = () => {
    setData({ ...data, currentPage: data.currentPage - 1 })
  }

  const handleSearch = (e) => {
    setData({
      ...data,
      selectedGenre: null,
      currentPage: 1,
      searchQuery: e.target.value,
    })
  }

  const toPrintMovies = () => {
    const {
      movies,
      selectedGenre,
      searchQuery,
      sortColumn,
      currentPage,
      pageSize,
    } = data
    let filterred = movies

    if (selectedGenre?._id)
      filterred = movies.filter((m) => m.genre?._id === selectedGenre?._id)

    if (searchQuery)
      filterred = filterred.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      )

    const sorted = _.orderBy(filterred, [sortColumn.path], [sortColumn.order])
    const display = Paginate(sorted, currentPage, pageSize)

    return {
      moviesToPrint: display,
      moviesTotal: filterred.length,
    }
  }

  const movieData = toPrintMovies()
  return (
    <main>
      <Container>
        <Row className="mt-4">
          <Col sm={3}>
            <Sidebar
              genres={data.genres}
              selectedItem={data.selectedGenre}
              onSelectGenre={handleSelectGenre}
            />
          </Col>
          <Col sm={9}>
            <h3>
              Movies
              {currentUser?.isAdmin && (
                <Button as={Link} to="/movies/new" className="ms-3">
                  Add movie
                </Button>
              )}
            </h3>
            <p>Showing {movieData.moviesTotal} movies from the database</p>
            <SearchBox onSearch={handleSearch} query={data.searchQuery} />

            <MoviesTable
              movies={movieData.moviesToPrint}
              onLike={handleLike}
              onDelete={handleDelete}
              onSort={handleSort}
              sortColumn={data.sortColumn}
            />

            <DataPagination
              currentPage={data.currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              totalData={movieData.moviesTotal}
              onPrev={handlePrevious}
              onNext={handleNext}
            />
          </Col>
        </Row>
      </Container>
      <Outlet />
    </main>
  )
}

export default Movies
