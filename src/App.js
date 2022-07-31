import {
  Router,
  Routes,
  Route,
  Login,
  Logout,
  NotFound,
  Navigate,
  Register,
  MovieForm,
  Layout,
  Movies,
  ProtectedRoute,
  UserProvider,
} from './startup/imports'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Movies />} />
            <Route element={<ProtectedRoute />}>
              <Route path="movies/:movieId" element={<MovieForm />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
