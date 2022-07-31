import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'

const ProtectedRoute = ({ children, redirect = '/login' }) => {
  const { pathname } = useLocation()
  const { currentUser } = useUserContext()

  if (!currentUser)
    return <Navigate to={redirect} state={{ from: pathname }} replace />

  return children ? children : <Outlet />
}

export default ProtectedRoute
