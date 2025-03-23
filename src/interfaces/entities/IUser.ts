export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginByEmailRequestDto {
  email: string;
  password: string;
}

export interface ILoginByNicknameRequestDto {
  username: string;
  password: string;
}

export interface ICreateUserRequestDto extends ILoginByNicknameRequestDto {
  email: string;
}

export interface ILoginForm extends ILoginByEmailRequestDto {}

export interface ISignUpForm extends ILoginForm {
  username: string;
  repeatedPassword: string;
}
