import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          MovieLookup
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#">Favorites</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Button as={Link} to="/register" variant="primary">
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;