import { useCallback } from 'react';
import {
  Button,
  ButtonToolbar,
  Divider,
  FlexboxGrid,
  Form,
  Input,
} from 'rsuite';
import { useFormik } from 'formik';
import { pickBy, identity } from 'lodash';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import { useNavigate } from 'react-router-dom';

import { loginFormValidationSchema } from '../../../utils/validation/authSchemas';
import { useLoginWithEmail } from '../../../../firebase';

import { ILoginForm } from '../../../../../interfaces/ILoginForm';

import styles from './LoginForm.module.scss';

export interface ILoginFormProps {}

const initialValues: ILoginForm = {
  email: '',
  password: '',
};

export const LoginForm: React.FC<ILoginFormProps> = () => {
  // const onSignIn = () => {};
  const { signInWithEmail, isLoading } = useLoginWithEmail();
  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    navigate('/auth/sign-up');
  }, [navigate]);

  const formik = useFormik({
    initialValues,
    // initialErrors: errors,
    enableReinitialize: true,
    onSubmit: signInWithEmail,
    validate: (values) => {
      const { email, password } = loginFormValidationSchema.check(values);
      const errors = {
        email: email.errorMessage,
        password: password.errorMessage,
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
        <div>
          <div className={styles.formWrapper}>
            <Button
              color="red"
              appearance="primary"
              size="lg"
              // onClick={onGoogleAuth}
              block
            >
              <GoogleIcon /> Авторизировать с помощью Google
            </Button>
          </div>
          <div>
            <Divider>или</Divider>
          </div>
        </div>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Введите Email: </Form.ControlLabel>
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
        <Form.ControlLabel>Пароль: </Form.ControlLabel>
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
        <FlexboxGrid justify="start" align="middle">
          <span>Ещё не зарегистрированы? </span>
          <Button appearance="link" onClick={onSignUp} disabled={isLoading}>
            Создать аккаунт
          </Button>
        </FlexboxGrid>
      </Form.Group>

      <ButtonToolbar>
        <Button
          appearance="primary"
          block
          size="md"
          onClick={() => formik.handleSubmit()}
        >
          Войти
        </Button>
      </ButtonToolbar>
    </Form>
  );
};
