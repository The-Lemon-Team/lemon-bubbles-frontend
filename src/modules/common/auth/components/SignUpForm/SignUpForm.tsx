import { useCallback } from 'react';
import { Form, ButtonToolbar, Button, Input } from 'rsuite';
import { pickBy, identity, Dictionary } from 'lodash';
import { useFormik } from 'formik';

import { signUpFormValidationSchema } from '../../../utils/validation/authSchemas';

import { ISignUpForm } from '../../../../../interfaces';

interface SignUpFormProps {
  isLoading?: boolean;
  errors?: Dictionary<string>;

  onSignUp: (email: string, password: string) => void;
}

const initialValues: ISignUpForm = {
  email: '',
  password: '',
  repeatedPassword: '',
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
  errors = {},
  isLoading = false,
  onSignUp,
}) => {
  const formik = useFormik({
    initialValues,
    initialErrors: errors,
    enableReinitialize: true,
    onSubmit: ({ email, password }) => {
      onSignUp(email, password);
    },
    validate: (values) => {
      const { email, password, repeatedPassword } =
        signUpFormValidationSchema.check(values);
      const errors = {
        email: email.errorMessage,
        password: password.errorMessage,
        repeatedPassword: repeatedPassword.errorMessage,
      };

      return pickBy(errors, identity);
    },
  });
  const handleFormikChange = useCallback(
    (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
      formik.handleChange(e);
    },
    [formik],
  );

  return (
    <Form fluid formValue={formik.values}>
      <Form.Group>
        <Form.ControlLabel>Email: </Form.ControlLabel>
        <Input
          name="email"
          type="email"
          onChange={handleFormikChange}
          disabled={isLoading}
        />
        <Form.ErrorMessage show={!!formik.errors.email}>
          {formik.errors.email}
        </Form.ErrorMessage>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Пароль</Form.ControlLabel>
        <Input
          name="password"
          type="password"
          autoComplete="off"
          disabled={isLoading}
          onChange={handleFormikChange}
        />
        <Form.ErrorMessage show={!!formik.errors.password}>
          {formik.errors.password}
        </Form.ErrorMessage>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Повторить пароль</Form.ControlLabel>
        <Input
          name="repeatedPassword"
          type="password"
          autoComplete="off"
          disabled={isLoading}
          onChange={handleFormikChange}
        />
        <Form.ErrorMessage show={!!formik.errors.repeatedPassword}>
          {formik.errors.repeatedPassword}
        </Form.ErrorMessage>
      </Form.Group>

      <ButtonToolbar>
        <Button
          appearance="primary"
          block
          size="md"
          loading={isLoading}
          onClick={() => formik.handleSubmit()}
        >
          Зарегистрироваться
        </Button>
      </ButtonToolbar>
    </Form>
  );
};
