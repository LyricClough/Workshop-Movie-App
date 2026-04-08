import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';

function RegisterPage() {
  return (
    <>
      <NavBar />

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="fw-bold mb-2">Register</h1>
                <p className="text-muted mb-4">Create your MovieLookup account.</p>

                <Form>
                  <Form.Group className="mb-3" controlId="registerUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Choose a username" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Create a password" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="registerConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter your password" />
                  </Form.Group>

                  <Button variant="primary" className="w-100 mt-2" type="submit">
                    Create Account
                  </Button>
                </Form>

                <p className="text-center text-muted mt-4 mb-0">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegisterPage;