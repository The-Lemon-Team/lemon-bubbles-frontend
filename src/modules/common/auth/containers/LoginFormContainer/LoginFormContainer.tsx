import React from 'react';

import { LoginForm } from '../../components';

import { useFirebaseAuth } from '../../../../firebase/useFirebaseAuth';

export const LoginFormContainer = () => {
  const { signInWithGoogle } = useFirebaseAuth();

  return <LoginForm onGoogleAuth={signInWithGoogle} />;
};
