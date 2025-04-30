import { useDispatch } from 'react-redux';
import { useCreateUser, setUser } from '../../../user';
import { useLoginWithEmail } from '../../hooks';
import { SignUpForm } from '../../components';

import { ISignUpForm, IUser } from '../../../../interfaces';

export const SignUpContainer = () => {
  const dispatch = useDispatch();
  const { createUser, isCreating } = useCreateUser();
  const { signInWithEmail } = useLoginWithEmail();

  const handleSignUp = ({ repeatedPassword, ...payload }: ISignUpForm) => {
    createUser(payload).then((response) => {
      signInWithEmail({
        email: payload.email,
        password: payload.password,
      });
      dispatch(setUser(response.payload as IUser));
    });
  };

  return (
    <SignUpForm onSignUp={handleSignUp} errors={{}} isLoading={isCreating} />
  );
};
