import { useEffect } from 'react'
import { useUserContext } from '../context/userContext'
import auth from '../services/authService'

const Logout = () => {
  const { setCurrentUser } = useUserContext()

  useEffect(() => {
    auth.logout()
    setCurrentUser(null)

    window.location = '/'
  })
}

export default Logout
