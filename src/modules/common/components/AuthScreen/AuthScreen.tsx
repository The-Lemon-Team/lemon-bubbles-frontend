import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginFormContainer } from '../../auth/containers';

import { useFirebaseAuth } from '../../../firebase/useFirebaseAuth';

export function AuthScreenContainer() {
  const { user } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div>
      <LoginFormContainer />
    </div>
  );
}
