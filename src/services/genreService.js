import http from './httpService'

export function getGenres() {
  return http.get(process.env.REACT_APP_GENRE_API)
}
