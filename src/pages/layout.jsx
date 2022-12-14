import { Outlet, Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { useUserContext } from '../context/userContext'

function Layout() {
  const { currentUser } = useUserContext()
  return (
    <>
      <ToastContainer />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Vidly
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Movies
              </Nav.Link>
            </Nav>
            <Nav className="navbar-right">
              {!currentUser && (
                <>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}

              {currentUser && (
                <>
                  <Nav.Link as={NavLink} to="/profile">
                    {currentUser.name}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default Layout
