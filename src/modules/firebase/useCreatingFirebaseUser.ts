import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { firebaseAuth } from './firebase';

export const useCreatingFirebaseUser = () => {
  const [createUser, user, isLoading, error] =
    useCreateUserWithEmailAndPassword(firebaseAuth);

  return {
    createUser,
    user,
    isLoading,
    error,
  };
};
