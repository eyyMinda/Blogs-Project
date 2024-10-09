type ChangePassType = {
  passwordOld?: string;
  passwordNew: string;
  passwordConfirm: string;
};

interface ChangePasswordActionParams {
  password: string;
  email: string;
}
