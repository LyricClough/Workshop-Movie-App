import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';

function LoginPage() {
  return (
    <>
      <NavBar />

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h1 className="fw-bold mb-2">Login</h1>
                <p className="text-muted mb-4">Welcome back to MovieLookup.</p>

                <Form>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                  </Form.Group>

                  <Button variant="primary" className="w-100 mt-2" type="submit">
                    Login
                  </Button>
                </Form>

                <p className="text-center text-muted mt-4 mb-0">
                  Don’t have an account? <Link to="/signup">Create one here</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;