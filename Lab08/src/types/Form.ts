export interface SignInValues {
  email: string;
  password: string;
}
export interface SignUpValues extends SignInValues {
  name: string;
  phone: string;
  confirmPassword: string;
}
