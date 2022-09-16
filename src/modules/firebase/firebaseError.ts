export const FirebaseCreatingErrors = {
  EMAIL_IS_USED: 'auth/email-already-in-use',
  EMAIL_NOT_FOUND: 'auth/user-not-found',
  WEAK_PASSWORD: 'auth/weak-password',
  WRONG_PASSOWRD: 'auth/wrong-password',
} as const;

export const errorsMap = {
  [FirebaseCreatingErrors.EMAIL_IS_USED]: 'Email уже используется',
  [FirebaseCreatingErrors.WEAK_PASSWORD]: 'Слабый пароль',
  [FirebaseCreatingErrors.EMAIL_NOT_FOUND]: 'Пользователь не найден',
  [FirebaseCreatingErrors.WRONG_PASSOWRD]: 'Неверный пароль, повторите ещё раз',
} as const;
