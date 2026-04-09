import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import NavBar from '../components/NavBar.jsx';
import { auth } from '../firebase/config.js';
import { authErrorMessage } from '../firebase/authErrors.js';
import { createUserProfile } from '../firebase/userProfile.js';

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const name = username.trim();
    if (!name) {
      setError('Please enter a username.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      await updateProfile(user, { displayName: name });
      await createUserProfile(user.uid, { username: name, email: email.trim() });
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
                <h1 className="fw-bold mb-2">Register</h1>
                <p className="text-muted mb-4">Create your MovieLookup account.</p>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="registerUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(ev) => setUsername(ev.target.value)}
                      autoComplete="username"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="registerEmail">
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

                  <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      autoComplete="new-password"
                      required
                      minLength={6}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="registerConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(ev) => setConfirmPassword(ev.target.value)}
                      autoComplete="new-password"
                      required
                      minLength={6}
                    />
                  </Form.Group>

                  <Button variant="primary" className="w-100 mt-2" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Creating account…
                      </>
                    ) : (
                      'Create Account'
                    )}
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
