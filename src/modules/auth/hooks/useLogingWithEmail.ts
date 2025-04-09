import { useNavigate } from 'react-router-dom';

import { loginByEmail } from '../../auth/stores/authSlice';
import { useAppSelector, useAppDispatch } from '../../common/stores/hooks';

import { ILoginByEmailRequestDto } from '../../../interfaces';

export const useLoginWithEmail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth.logging.status === 'loading',
  );
  const error = useAppSelector(
    (state) => state.auth.logging.status === 'error',
  );

  const signInWithEmail = (payload: ILoginByEmailRequestDto) => {
    dispatch(loginByEmail(payload)).then(() => navigate('/board'));
  };

  return {
    isLoading,
    error,

    signInWithEmail,
  };
};
