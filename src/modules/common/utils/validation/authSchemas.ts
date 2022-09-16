import { Schema } from 'rsuite';

export const loginFormValidationSchema = Schema.Model({
  email: Schema.Types.StringType()
    .isEmail('Введите email адрес')
    .isRequired('Введите Email'),
  password: Schema.Types.StringType().isRequired('Обязательное поле'),
});

export const signUpFormValidationSchema = Schema.Model.combine(
  loginFormValidationSchema,
  Schema.Model({
    repeatedPassword: Schema.Types.StringType()
      .addRule((value, data) => {
        if (value !== data.password) {
          return false;
        }

        return true;
      }, 'Пароли не совпадают')
      .isRequired('Обязательное поле'),
  }),
);
