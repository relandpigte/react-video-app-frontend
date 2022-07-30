import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './pages/layout'
import Movies from './pages/movies'
import NotFound from './pages/notFound'
import Register from './pages/register'
import Login from './pages/login'
import Customer from './pages/customer'
import Logout from './pages/logout'
import MovieForm from './components/movieForm'
import auth from './services/authService'
import ProtectedRoute from './components/common/protectedRoute'
import UnProtectedRoute from './components/common/unProtectedRoute'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = auth.getCurrentUser()
    setUser(userData)
  }, [])

  return (
    <Router>
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route path="/" element={<Movies user={user} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="movies/:movieId" element={<MovieForm />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<UnProtectedRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
