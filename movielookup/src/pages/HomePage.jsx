import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import NavBar from '../components/NavBar.jsx';
import MovieCard from '../components/MovieCard.jsx';

function HomePage() {
  return (
    <>
      <NavBar />

      <Container className="py-5">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="fw-bold mb-3">Find movies without the clutter.</h1>
            <p className="text-muted mb-0">
              Search for movies quickly, browse simple results, and save favorites.
            </p>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm mb-5" style={{ backgroundColor: '#eef6f7' }}>
          <Card.Body className="p-4">
            <Form>
              <Form.Label className="fw-semibold">Search for movies</Form.Label>

              <Row className="g-2 mb-3">
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Type a movie title..."
                  />
                </Col>
                <Col md={3}>
                  <Button variant="primary" className="w-100">
                    Search
                  </Button>
                </Col>
              </Row>

              <Row className="g-2">
                <Col md={3}>
                  <Form.Select>
                    <option>Year</option>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </Form.Select>
                </Col>

                <Col md={3}>
                  <Form.Select>
                    <option>Genre</option>
                    <option>Action</option>
                    <option>Drama</option>
                    <option>Comedy</option>
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <section>
          <h2 className="fw-bold mb-4">Popular Results</h2>

          <MovieCard
            title="Forrest Gump"
            year="1994"
            rating="8.8"
            genres="Drama, Romance"
          />
          <MovieCard
            title="Inception"
            year="2010"
            rating="8.8"
            genres="Action, Sci-Fi"
          />
          <MovieCard
            title="Pulp Fiction"
            year="1994"
            rating="8.9"
            genres="Crime, Drama"
          />
        </section>
      </Container>
    </>
  );
}

export default HomePage;