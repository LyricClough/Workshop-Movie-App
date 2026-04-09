import { Card, Button, Row, Col } from 'react-bootstrap';
import { getPosterUrl } from '../api/tmdb.js';

function MovieCard({ title, year, rating, genres, posterPath }) {
  const posterSrc = getPosterUrl(posterPath, 'w185');

  return (
    <Card className="shadow-sm border-0 mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={2} className="mb-3 mb-md-0">
            {posterSrc ? (
              <img
                src={posterSrc}
                alt={title}
                className="rounded w-100"
                style={{
                  height: '140px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                className="bg-secondary-subtle rounded d-flex align-items-center justify-content-center"
                style={{ height: '140px' }}
              >
                No poster
              </div>
            )}
          </Col>

          <Col xs={12} md={7}>
            <h5 className="fw-bold mb-2">{title}</h5>
            <p className="mb-1 text-muted">Year: {year}</p>
            <p className="mb-1 text-muted">Rating: {rating}</p>
            <p className="mb-0 text-muted">Genres: {genres}</p>
          </Col>

          <Col xs={12} md={3} className="mt-3 mt-md-0 d-grid gap-2">
            <Button variant="outline-dark">View</Button>
            <Button variant="outline-danger">❤ Favorite</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;