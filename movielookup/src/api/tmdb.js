const TMDB_BASE = 'https://api.themoviedb.org/3';

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) {
    throw new Error(
      'Missing VITE_TMDB_API_KEY. Add it to a .env file in the project root.',
    );
  }
  return key;
}

export function getPosterUrl(posterPath, size = 'w185') {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

export async function fetchMovieGenres() {
  const key = getApiKey();
  const res = await fetch(
    `${TMDB_BASE}/genre/movie/list?api_key=${encodeURIComponent(key)}`,
  );
  if (!res.ok) {
    throw new Error(`Genres request failed (${res.status})`);
  }
  const data = await res.json();
  return data.genres ?? [];
}

export async function searchMovies({ query, page = 1, primaryReleaseYear }) {
  const key = getApiKey();
  const params = new URLSearchParams({
    api_key: key,
    query: query.trim(),
    page: String(page),
  });
  if (primaryReleaseYear) {
    params.set('primary_release_year', String(primaryReleaseYear));
  }
  const res = await fetch(`${TMDB_BASE}/search/movie?${params}`);
  if (!res.ok) {
    throw new Error(`Search failed (${res.status})`);
  }
  return res.json();
}
