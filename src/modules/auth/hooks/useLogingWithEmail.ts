import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../common';
import { loginByEmail } from '../stores/authSlice';

import { ILoginByEmailRequestDto } from '../../../interfaces';

export const useLoginWithEmail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.auth.logging.status === 'loading',
  );
  const errorStatus = useAppSelector(
    (state) => state.auth.logging.status === 'error',
  );
  const errorMessage = useAppSelector((state) => state.auth.logging.error);

  const signInWithEmail = (payload: ILoginByEmailRequestDto) => {
    dispatch(loginByEmail(payload)).then(() => navigate('/board'));
  };

  return {
    isLoading,
    errorStatus,
    errorMessage,

    signInWithEmail,
  };
};
