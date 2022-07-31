import { createContext, useState, useContext } from 'react'
import auth from '../services/authService'

const UserContext = createContext()

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(auth.getCurrentUser())

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
