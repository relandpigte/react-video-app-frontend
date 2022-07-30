import http from './httpService'

const apiEndpoint = '/genres'

export function getGenres() {
  return http.get(apiEndpoint)
}
