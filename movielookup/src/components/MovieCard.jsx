import { useState } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { getPosterUrl } from '../api/tmdb.js';

function MovieCard({
  movie,
  year,
  rating,
  genres,
  libraryMode = false,
  listLabel = 'list',
  onRemoveFromList,
  isSaved = false,
  isFavorite = false,
  onToggleSaved,
  onToggleFavorite,
}) {
  const [busy, setBusy] = useState(null);

  const title = movie.title || movie.original_title || 'Untitled';
  const posterSrc = getPosterUrl(movie.poster_path, 'w185');

  const handleSave = async () => {
    if (!onToggleSaved) return;
    setBusy('save');
    try {
      await onToggleSaved(movie);
    } finally {
      setBusy(null);
    }
  };

  const handleFavorite = async () => {
    if (!onToggleFavorite) return;
    setBusy('favorite');
    try {
      await onToggleFavorite(movie);
    } finally {
      setBusy(null);
    }
  };

  const saveBusy = busy === 'save';
  const favBusy = busy === 'favorite';

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
            {libraryMode ? (
              <Button variant="outline-danger" onClick={() => onRemoveFromList?.()}>
                Remove from {listLabel}
              </Button>
            ) : (
              <>
                <Button
                  variant={isSaved ? 'primary' : 'outline-primary'}
                  onClick={handleSave}
                  disabled={saveBusy || favBusy}
                >
                  {saveBusy ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Save
                    </>
                  ) : isSaved ? (
                    'Saved'
                  ) : (
                    'Save'
                  )}
                </Button>
                <Button
                  variant={isFavorite ? 'danger' : 'outline-danger'}
                  onClick={handleFavorite}
                  disabled={saveBusy || favBusy}
                >
                  {favBusy ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Favorite
                    </>
                  ) : isFavorite ? (
                    '❤ Favorited'
                  ) : (
                    '❤ Favorite'
                  )}
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
