interface AuthFieldConfig {
  name: "email" | "password";
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChangeCapture?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface ChangePassFieldConfig {
  name: "passwordOld" | "passwordNew" | "passwordConfirm";
  type?: "password";
  label: string;
  description?: string;
  onChangeCapture?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
