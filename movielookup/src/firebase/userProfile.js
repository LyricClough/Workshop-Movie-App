import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './config.js';

export async function createUserProfile(uid, { username, email }) {
  await setDoc(doc(db, 'users', uid), {
    username,
    email,
    createdAt: serverTimestamp(),
  });
}
