import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { firebaseAuth } from './firebase';

export const useLoginWithEmail = () => {
  const [signInWithEmail, user, isLoading, error] =
    useSignInWithEmailAndPassword(firebaseAuth);

  return {
    signInWithEmail,
    user,
    isLoading,
    error,
  };
};
