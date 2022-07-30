import http from './httpService'
const apiUrl = process.env.REACT_APP_MOVIE_API

function movieUrl(id) {
  return `${apiUrl}/${id}`
}

export function getMovies() {
  return http.get(apiUrl)
}

export function getMovie(id) {
  return http.get(movieUrl(id))
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return http.put(movieUrl(movie._id), body)
  }

  return http.post(apiUrl, movie)
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id))
}
