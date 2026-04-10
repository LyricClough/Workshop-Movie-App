/**
 * @param {import('firebase/auth').AuthError | string | undefined} error
 */
export function authErrorMessage(error) {
  const code = typeof error === 'string' ? error : error?.code;
  const rawMessage = typeof error === 'object' && error?.message ? error.message : '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'That email is already registered.';
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not set up for this project or your .env does not match the Firebase app. In Firebase Console: open Authentication once to enable the service; under Project settings → Your apps, confirm the Web app’s config matches VITE_FIREBASE_* in .env (especially apiKey and authDomain). Restart npm run dev after changes.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is turned off in Firebase. In the Firebase Console, open Authentication → Sign-in method and enable Email/Password.';
    case 'auth/invalid-api-key':
      return 'The Firebase API key in your .env does not match this project. Copy the web API key from Project settings and restart the dev server.';
    case 'permission-denied':
      return 'Could not save your profile. Check Firestore rules in Firebase Console.';
    default:
      if (rawMessage && !rawMessage.startsWith('Firebase: Error (auth/network-request-failed)')) {
        return rawMessage;
      }
      return 'Something went wrong. Please try again.';
  }
}
