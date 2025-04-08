import { useFormik } from 'formik';
import { Input, Form, Text, Heading, Button } from 'rsuite';
import classNames from 'classnames';

import { useUser } from '../../../common/hooks/useUser';
import styles from './UserForm.module.scss';

import { IUserEditForm } from '../../../../interfaces';

export const UserForm = () => {
  const { user, editUser } = useUser();
  const initialValues = user || {
    email: '',
    username: '',
  };

  const formikBag = useFormik<IUserEditForm>({
    initialValues,
    onSubmit: editUser,
    enableReinitialize: true,
  });

  return (
    <div>
      <div className={styles.userContainer}>
        <div className={styles.heading}>
          <Heading level={4}>Пользователь:</Heading>
        </div>

        <form onSubmit={formikBag.handleSubmit} className={styles.form}>
          <div
            className={classNames(styles.fieldContainer, styles.fioContainer)}
          >
            <Form.ControlLabel htmlFor="firstName">
              <Text size="lg">Имя: </Text>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Имя"
                value={formikBag.values.firstName}
                onChange={(value) =>
                  formikBag.setFieldValue('firstName', value)
                }
              />
            </Form.ControlLabel>
            <Form.ControlLabel htmlFor="lastName">
              <Text size="lg">Фамилия: </Text>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Фамилия"
                value={formikBag.values.lastName}
                onChange={(value) => formikBag.setFieldValue('lastName', value)}
              />
            </Form.ControlLabel>
          </div>
          <div className={styles.fieldContainer}>
            <Form.ControlLabel htmlFor="email">
              <Text size="lg">Email:</Text>
              <Input
                id="email"
                name="email"
                disabled
                value={formikBag.values.email}
                onChange={(value) => formikBag.setFieldValue('email', value)}
              />
            </Form.ControlLabel>
          </div>

          <div className={styles.fieldContainer}>
            <Form.ControlLabel htmlFor="username">
              <Text size="lg">Логин:</Text>
              <Input
                id="username"
                name="username"
                disabled
                value={formikBag.values.username}
                onChange={(value) => formikBag.setFieldValue('username', value)}
              />
            </Form.ControlLabel>
          </div>
          <div className={styles.fieldContainer}>
            <Form.ControlLabel htmlFor="password">
              <Text size="lg">Пароль:</Text>
              <Input
                id="password"
                name="password"
                value={formikBag.values.password}
                onChange={(value) => formikBag.setFieldValue('password', value)}
              />
            </Form.ControlLabel>
          </div>
          <div className={styles.fieldContainer}>
            <Form.ControlLabel htmlFor="newPassword">
              <Text size="lg">Новый пароль:</Text>
              <Input
                id="newPassword"
                name="newPassword"
                value={formikBag.values.newPassword}
                onChange={(value) =>
                  formikBag.setFieldValue('newPassword', value)
                }
              />
            </Form.ControlLabel>
          </div>
          <div
            className={classNames(
              styles.fieldContainer,
              styles.submitContainer,
            )}
          >
            <Button appearance="primary" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>

      <div className={styles.heading}>
        <Heading level={4}>Статистика:</Heading>

        <div>
          <Text size="lg">Всего записей</Text>
        </div>

        <div>
          <Text size="lg">Самый популярный хэштег</Text>
        </div>

        <div>
          <Text size="lg">Записей за неделю</Text>
        </div>
      </div>
    </div>
  );
};
