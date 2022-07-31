import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom'
import Layout from '../pages/layout'
import Movies from '../pages/movies'
import NotFound from '../pages/notFound'
import Register from '../pages/register'
import Login from '../pages/login'
import Logout from '../pages/logout'
import MovieForm from '../components/movieForm'
import ProtectedRoute from '../components/common/protectedRoute'
import UnProtectedRoute from '../components/common/unProtectedRoute'
import { UserProvider } from '../context/userContext'
import ReactToastify from 'react-toastify/dist/ReactToastify.css'
import ReactBootstrap from 'bootstrap/dist/css/bootstrap.min.css'

export {
  Routes,
  Route,
  Navigate,
  Router,
  Layout,
  Movies,
  NotFound,
  Register,
  Login,
  Logout,
  MovieForm,
  ProtectedRoute,
  UnProtectedRoute,
  UserProvider,
  ReactToastify,
  ReactBootstrap,
}
