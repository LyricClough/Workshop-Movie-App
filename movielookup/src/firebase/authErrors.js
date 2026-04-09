export function authErrorMessage(code) {
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
    case 'permission-denied':
      return 'Could not save your profile. Check Firestore rules in Firebase Console.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
