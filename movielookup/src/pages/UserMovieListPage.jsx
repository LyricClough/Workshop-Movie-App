import { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  removeFavoriteMovie,
  removeSavedMovie,
  subscribeFavoriteMovies,
  subscribeSavedMovies,
} from '../firebase/movieLists.js';

function firestoreRowToTmdbShape(row) {
  return {
    id: row.tmdbId ?? Number(row.id),
    title: row.title,
    poster_path: row.posterPath,
    release_date: row.releaseDate,
    vote_average: row.voteAverage,
    genre_ids: [],
  };
}

function formatYear(releaseDate) {
  if (!releaseDate) return '—';
  const y = String(releaseDate).slice(0, 4);
  return y || '—';
}

function formatRating(voteAverage) {
  if (voteAverage == null || Number.isNaN(voteAverage)) return '—';
  return Number(voteAverage).toFixed(1);
}

export default function UserMovieListPage({ list }) {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSaved = list === 'saved';

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setListLoading(false);
      setRows([]);
      return;
    }
    setListLoading(true);
    setError(null);
    const subscribe = isSaved ? subscribeSavedMovies : subscribeFavoriteMovies;
    const unsub = subscribe(user.uid, (data) => {
      setRows(data);
      setListLoading(false);
    });
    return () => unsub();
  }, [user, authLoading, isSaved]);

  const handleRemove = async (tmdbId) => {
    if (!user) return;
    try {
      if (isSaved) await removeSavedMovie(user.uid, tmdbId);
      else await removeFavoriteMovie(user.uid, tmdbId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not update list.');
    }
  };

  if (authLoading) {
    return (
      <>
        <NavBar />
        <Container className="py-5 text-center">
          <Spinner animation="border" />
        </Container>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavBar />
        <Container className="py-5">
          <Alert variant="info">
            <Alert.Heading>Sign in required</Alert.Heading>
            <p className="mb-3">Log in to see your {isSaved ? 'saved' : 'favorite'} movies.</p>
            <Button as={Link} to="/login" variant="primary">
              Login
            </Button>
          </Alert>
        </Container>
      </>
    );
  }

  const title = isSaved ? 'Saved movies' : 'Favorites';
  const emptyText = isSaved
    ? 'No saved movies yet. Search on the home page and tap Save.'
    : 'No favorites yet. Tap the heart on a movie to add it here.';

  return (
    <>
      <NavBar />
      <Container className="py-5">
        <h1 className="fw-bold mb-4">{title}</h1>

        {error && (
          <Alert variant="danger" className="mb-3" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {listLoading ? (
          <p className="text-muted">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-muted">{emptyText}</p>
        ) : (
          rows.map((row) => {
            const movie = firestoreRowToTmdbShape(row);
            const tmdbId = String(movie.id);
            return (
              <MovieCard
                key={tmdbId}
                movie={movie}
                year={formatYear(row.releaseDate)}
                rating={formatRating(row.voteAverage)}
                genres="—"
                libraryMode
                listLabel={isSaved ? 'saved' : 'favorites'}
                onRemoveFromList={() => handleRemove(tmdbId)}
              />
            );
          })
        )}

        <Button variant="outline-secondary" className="mt-3" onClick={() => navigate('/')}>
          Back to search
        </Button>
      </Container>
    </>
  );
}
