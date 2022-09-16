import { ILoginForm } from './ILoginForm';

export interface ISignUpForm extends ILoginForm {
  repeatedPassword: string;
}
