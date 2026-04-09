import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

function requireEnv(name) {
  const v = import.meta.env[name];
  if (v == null || !String(v).trim()) {
    throw new Error(`Missing ${name}. Add it to .env (see .env.example).`);
  }
  return String(v).trim();
}

const firebaseConfig = {
  apiKey: requireEnv('VITE_FIREBASE_API_KEY'),
  authDomain: requireEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: requireEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: requireEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requireEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: requireEnv('VITE_FIREBASE_APP_ID'),
};

const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim();
if (measurementId) {
  firebaseConfig.measurementId = measurementId;
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((ok) => {
      if (ok) analytics = getAnalytics(app);
    })
    .catch(() => {});
}

export { app };
