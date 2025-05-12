import { useCallback } from 'react';
import {
  ButtonToolbar,
  Divider,
  FlexboxGrid,
  Form,
  Input,
  Notification,
  Button,
} from 'rsuite';
import { useFormik } from 'formik';
import { pickBy, identity } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../../../common/components';
import { loginFormValidationSchema } from '../../../common/utils/validation/authSchemas';
import { useLoginWithEmail } from '../../hooks/useLogingWithEmail';

import { ILoginByEmailRequestDto } from '../../../../interfaces';

import styles from './LoginForm.module.scss';
import classNames from 'classnames';

export interface ILoginFormProps {}

const initialValues: ILoginByEmailRequestDto = {
  email: '',
  password: '',
};

export const LoginForm: React.FC<ILoginFormProps> = () => {
  const { signInWithEmail, errorMessage, isLoading } = useLoginWithEmail();
  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    navigate('/auth/sign-up');
  }, [navigate]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: signInWithEmail,
    validate: (values) => {
      const validation = loginFormValidationSchema.check(values);
      const errors = {
        email: validation.email?.errorMessage,
        password: validation.password?.errorMessage,
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
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <Divider />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Введите Email: </Form.ControlLabel>
        <Input
          name="email"
          type="email"
          data-testid="email"
          className={errorMessage && styles.fieldError}
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
          className={errorMessage && styles.fieldError}
          data-testid="password"
          disabled={isLoading}
          onChange={handleFormikChange}
        />
      </Form.Group>

      {errorMessage?.message && (
        <Notification
          data-testid="error-message"
          className={styles.errorMessage}
          type="error"
        >
          {errorMessage?.message}
        </Notification>
      )}

      <Form.Group>
        <FlexboxGrid justify="start" align="middle">
          <span>Ещё не зарегистрированы? </span>
          <Button
            appearance="link"
            onClick={onSignUp}
            data-testid="sign-up-btn"
            disabled={isLoading}
          >
            Создать аккаунт
          </Button>
        </FlexboxGrid>
      </Form.Group>

      <ButtonToolbar>
        <Button
          appearance="primary"
          block
          size="md"
          data-testid="login"
          onClick={() => formik.handleSubmit()}
        >
          Войти
        </Button>
      </ButtonToolbar>
    </Form>
  );
};
