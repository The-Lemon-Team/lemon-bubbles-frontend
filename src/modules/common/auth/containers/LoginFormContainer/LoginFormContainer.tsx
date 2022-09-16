import { useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pickBy, identity, isEmpty } from 'lodash';

import { LoginForm } from '../../components';

import { FirebaseCreatingErrors } from '../../../../firebase/firebaseError';
import { useFirebaseAuth, useLoginWithEmail } from '../../../../firebase';

import { errorsMap } from '../../../../firebase/firebaseError';
import { useNotifierStore } from '../../../stores';

const firebaseErrorFieldMatches = {
  [FirebaseCreatingErrors.EMAIL_NOT_FOUND]: 'email',
  [FirebaseCreatingErrors.WRONG_PASSOWRD]: 'password',
} as const;

export const LoginFormContainer = () => {
  const { signInWithEmail, isLoading, error } = useLoginWithEmail();
  const { signInWithGoogle } = useFirebaseAuth();
  const { showError } = useNotifierStore();
  const navigate = useNavigate();

  const errors = useMemo(
    () =>
      pickBy(
        error && {
          [firebaseErrorFieldMatches[
            error?.code as keyof typeof firebaseErrorFieldMatches
          ]]: errorsMap[error?.code as keyof typeof firebaseErrorFieldMatches],
        },
        identity,
      ),
    [error],
  );

  useEffect(() => {
    if (isEmpty(errors) && error) {
      showError(error.message);
    }
  }, [errors, showError, error]);

  const onSignUp = useCallback(() => {
    navigate('/auth/sign-up');
  }, [navigate]);

  return (
    <LoginForm
      errors={errors}
      isLoading={isLoading}
      onGoogleAuth={signInWithGoogle}
      goToSignUp={onSignUp}
      onSignIn={signInWithEmail}
    />
  );
};
