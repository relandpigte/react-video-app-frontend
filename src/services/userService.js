import http from './httpService'
const apiUrl = process.env.REACT_APP_USERS_API

export function register(user) {
  return http.post(apiUrl, user)
}
