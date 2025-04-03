import { useNavigate } from 'react-router-dom';

import { useCreateUser } from '../../hooks/useCreateUser';
import { SignUpForm } from '../../components';

import { ISignUpForm } from '../../../../interfaces';

export const SignUpContainer = () => {
  const navigate = useNavigate();
  const { createUser, isCreating } = useCreateUser();

  const handleSignUp = ({ repeatedPassword, ...payload }: ISignUpForm) => {
    createUser(payload).then(() => navigate('/board'));
  };

  return (
    <SignUpForm onSignUp={handleSignUp} errors={{}} isLoading={isCreating} />
  );
};
