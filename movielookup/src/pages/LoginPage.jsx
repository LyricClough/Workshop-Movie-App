import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import NavBar from '../components/NavBar.jsx';
import { auth } from '../firebase/config.js';
import { authErrorMessage } from '../firebase/authErrors.js';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(authErrorMessage(err?.code));
    } finally {
      setLoading(false);
    }
  };

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

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      autoComplete="email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" className="w-100 mt-2" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Logging in…
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>

                <p className="text-center text-muted mt-4 mb-0">
                  Don’t have an account? <Link to="/register">Create one here</Link>
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
