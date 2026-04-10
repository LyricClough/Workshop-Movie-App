import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from './config.js';

/**
 * Firestore layout (per user):
 *
 * users/{userId}
 *   — profile fields (username, email, createdAt)
 *
 * users/{userId}/savedMovies/{tmdbId}
 *   — tmdbId (number), title, posterPath, releaseDate, voteAverage, overview,
 *     savedAt (server timestamp)
 *
 * users/{userId}/favoriteMovies/{tmdbId}
 *   — same movie fields + favoriteAt (server timestamp)
 *
 * Document IDs for movie subcollections are the TMDB id as a string.
 */

function savedRef(userId, tmdbId) {
  return doc(db, 'users', userId, 'savedMovies', String(tmdbId));
}

function favoriteRef(userId, tmdbId) {
  return doc(db, 'users', userId, 'favoriteMovies', String(tmdbId));
}

export function tmdbSearchResultToMovieFields(movie) {
  return {
    tmdbId: movie.id,
    title: movie.title || movie.original_title || '',
    posterPath: movie.poster_path ?? null,
    releaseDate: movie.release_date ?? null,
    voteAverage: movie.vote_average ?? null,
    overview: movie.overview ?? '',
  };
}

export async function addSavedMovie(userId, tmdbMovie) {
  const fields = tmdbSearchResultToMovieFields(tmdbMovie);
  await setDoc(savedRef(userId, fields.tmdbId), {
    ...fields,
    savedAt: serverTimestamp(),
  });
}

export async function removeSavedMovie(userId, tmdbId) {
  await deleteDoc(savedRef(userId, tmdbId));
}

export async function addFavoriteMovie(userId, tmdbMovie) {
  const fields = tmdbSearchResultToMovieFields(tmdbMovie);
  await setDoc(favoriteRef(userId, fields.tmdbId), {
    ...fields,
    favoriteAt: serverTimestamp(),
  });
}

export async function removeFavoriteMovie(userId, tmdbId) {
  await deleteDoc(favoriteRef(userId, tmdbId));
}

export function subscribeSavedMovieIds(userId, callback) {
  const col = collection(db, 'users', userId, 'savedMovies');
  return onSnapshot(col, (snap) => {
    callback(new Set(snap.docs.map((d) => d.id)));
  });
}

export function subscribeFavoriteMovieIds(userId, callback) {
  const col = collection(db, 'users', userId, 'favoriteMovies');
  return onSnapshot(col, (snap) => {
    callback(new Set(snap.docs.map((d) => d.id)));
  });
}

/** Full documents for library views: { id: docId, ...data }[] sorted by time desc */
export function subscribeSavedMovies(userId, callback) {
  const col = collection(db, 'users', userId, 'savedMovies');
  return onSnapshot(col, (snap) => {
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    rows.sort((a, b) => {
      const ta = a.savedAt?.toMillis?.() ?? 0;
      const tb = b.savedAt?.toMillis?.() ?? 0;
      return tb - ta;
    });
    callback(rows);
  });
}

export function subscribeFavoriteMovies(userId, callback) {
  const col = collection(db, 'users', userId, 'favoriteMovies');
  return onSnapshot(col, (snap) => {
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    rows.sort((a, b) => {
      const ta = a.favoriteAt?.toMillis?.() ?? 0;
      const tb = b.favoriteAt?.toMillis?.() ?? 0;
      return tb - ta;
    });
    callback(rows);
  });
}
