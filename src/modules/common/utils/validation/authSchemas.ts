import { Schema } from 'rsuite';

import { validationErrors } from '../../../firebase';

export const loginFormValidationSchema = Schema.Model({
  email: Schema.Types.StringType()
    .isEmail(validationErrors.email)
    .isRequired(validationErrors.required),
  password: Schema.Types.StringType().isRequired(validationErrors.required),
});

export const signUpFormValidationSchema = Schema.Model.combine(
  loginFormValidationSchema,
  Schema.Model({
    email: Schema.Types.StringType()
      .isEmail(validationErrors.email)
      .isRequired(validationErrors.required),
    password: Schema.Types.StringType().isRequired(),
    repeatedPassword: Schema.Types.StringType()
      .addRule((value, data) => {
        if (value !== data.password) {
          return false;
        }

        return true;
      }, validationErrors.repeatedPassword)
      .isRequired(validationErrors.required),
    username: Schema.Types.StringType().isRequired(validationErrors.required),
  }),
);
