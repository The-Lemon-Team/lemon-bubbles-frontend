import { Schema } from 'rsuite';

import { validationErrors } from '../../../firebase';

export const editUserSchema = Schema.Model({
  username: Schema.Types.StringType().isRequired(validationErrors.required),
  email: Schema.Types.StringType()
    .isEmail(validationErrors.email)
    .isRequired(validationErrors.required),
  firstName: Schema.Types.StringType(),
  lastName: Schema.Types.StringType(),

  password: Schema.Types.StringType().isRequired(validationErrors.required),
  newPassword: Schema.Types.StringType(),
});
