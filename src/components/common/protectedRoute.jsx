import { Navigate, Outlet, useLocation } from 'react-router-dom'
import auth from '../../services/authService'

const ProtectedRoute = ({ children, redirect = '/login' }) => {
  const { pathname } = useLocation()

  if (!auth.getCurrentUser())
    return <Navigate to={redirect} state={{ from: pathname }} replace />

  return children ? children : <Outlet />
}

export default ProtectedRoute
