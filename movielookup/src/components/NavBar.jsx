import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

function NavBar() {
  const { user, loading } = useAuth();

  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          MovieLookup
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/saved">
              Saved
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
            {!loading && user ? (
              <>
                <span className="text-muted small d-none d-lg-inline">{user.email}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => signOut(auth)}
                >
                  Log out
                </Button>
              </>
            ) : !loading ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Button as={Link} to="/register" variant="primary">
                  Register
                </Button>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
