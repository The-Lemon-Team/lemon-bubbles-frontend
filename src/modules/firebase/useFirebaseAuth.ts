import { useMemo } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { firebaseAuth } from './firebase';

export function useFirebaseAuth() {
  const [user, isLoading, error] = useAuthState(firebaseAuth, {});
  const userData = useMemo(() => user?.providerData[0], [user]);
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);

  return {
    user,
    isLoading,
    error,
    userData,
    signInWithGoogle,
  };
}
