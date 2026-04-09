import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import NavBar from '../components/NavBar.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { fetchMovieGenres, searchMovies } from '../api/tmdb.js';

const YEAR_OPTIONS = ['2025', '2024', '2023', '2022'];

function formatYear(releaseDate) {
  if (!releaseDate) return '—';
  const y = releaseDate.slice(0, 4);
  return y || '—';
}

function formatRating(voteAverage) {
  if (voteAverage == null || Number.isNaN(voteAverage)) return '—';
  return Number(voteAverage).toFixed(1);
}

function HomePage() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreMap, setGenreMap] = useState(() => new Map());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchMovieGenres();
        if (cancelled) return;
        setGenres(list);
        setGenreMap(new Map(list.map((g) => [g.id, g.name])));
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Could not load genres.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const genreNamesForMovie = (genreIds) => {
    if (!genreIds?.length) return '—';
    const names = genreIds
      .map((id) => genreMap.get(id))
      .filter(Boolean);
    return names.length ? names.join(', ') : '—';
  };

  const filteredResults = useMemo(() => {
    if (!genreId) return results;
    const id = Number(genreId);
    return results.filter((m) => m.genre_ids?.includes(id));
  }, [results, genreId]);

  const runSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setError('Please enter a movie title to search.');
      setResults([]);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await searchMovies({
        query: q,
        primaryReleaseYear: year || undefined,
      });
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

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
            <Form onSubmit={runSearch}>
              <Form.Label className="fw-semibold">Search for movies</Form.Label>

              <Row className="g-2 mb-3">
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Type a movie title..."
                    value={query}
                    onChange={(ev) => setQuery(ev.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Button variant="primary" className="w-100" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Search
                      </>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </Col>
              </Row>

              <Row className="g-2">
                <Col md={3}>
                  <Form.Select
                    value={year}
                    onChange={(ev) => setYear(ev.target.value)}
                    aria-label="Filter by year"
                  >
                    <option value="">Year</option>
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={3}>
                  <Form.Select
                    value={genreId}
                    onChange={(ev) => setGenreId(ev.target.value)}
                    aria-label="Filter by genre"
                  >
                    <option value="">Genre</option>
                    {genres.map((g) => (
                      <option key={g.id} value={String(g.id)}>
                        {g.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <section>
          <h2 className="fw-bold mb-4">Results</h2>

          {loading && !filteredResults.length ? (
            <p className="text-muted">Searching…</p>
          ) : filteredResults.length === 0 && !loading ? (
            <p className="text-muted">
              Enter a title and click Search to see movies from TMDB.
            </p>
          ) : (
            filteredResults.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title || movie.original_title || 'Untitled'}
                year={formatYear(movie.release_date)}
                rating={formatRating(movie.vote_average)}
                genres={genreNamesForMovie(movie.genre_ids)}
                posterPath={movie.poster_path}
              />
            ))
          )}

          {genreId && results.length > 0 && filteredResults.length === 0 && !loading && (
            <p className="text-muted">No matches for the selected genre in this search.</p>
          )}
        </section>
      </Container>
    </>
  );
}

export default HomePage;
