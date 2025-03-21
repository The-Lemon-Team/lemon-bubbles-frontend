import { SignUpForm } from '../../components';
import { useUser } from '../../../../board/hooks/useUser';
import { ISignUpForm } from '../../../../../interfaces';

export const SignUpContainer = () => {
  const { createUser, isCreating, isLoading } = useUser();

  const handleSignUp = ({ repeatedPassword, ...payload }: ISignUpForm) => {
    createUser(payload);
  };

  return (
    <SignUpForm
      onSignUp={handleSignUp}
      errors={{}}
      isLoading={isLoading || isCreating}
    />
  );
};
