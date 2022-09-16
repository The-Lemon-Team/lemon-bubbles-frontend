import { useMemo, useEffect } from 'react';
import { isEmpty, pickBy, identity } from 'lodash';

import { useCreatingFirebaseUser } from '../../../../firebase';
import {
  errorsMap,
  FirebaseCreatingErrors,
} from '../../../../firebase/firebaseError';
import { useNotifierStore } from '../../../stores';

import { SignUpForm } from '../../components';

const firebaseErrorFieldMatches = {
  [FirebaseCreatingErrors.EMAIL_IS_USED]: 'email',
  [FirebaseCreatingErrors.WEAK_PASSWORD]: 'password',
} as const;

export const SignUpContainer = () => {
  const { createUser, error, isLoading } = useCreatingFirebaseUser();
  const { showError } = useNotifierStore();

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

  return (
    <SignUpForm onSignUp={createUser} errors={errors} isLoading={isLoading} />
  );
};
