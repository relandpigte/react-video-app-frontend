import { Navigate, Outlet } from 'react-router-dom'
import auth from '../../services/authService'

const UnProtectedRoute = ({ children, redirect = '/' }) => {
  if (auth.getCurrentUser()) return <Navigate to={redirect} replace />

  return children ? children : <Outlet />
}

export default UnProtectedRoute
