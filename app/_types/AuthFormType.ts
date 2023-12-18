interface AuthFieldConfig {
  name: "email" | "password";
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCapture?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

interface ChangePassFieldConfig {
  name: "passwordOld" | "passwordNew" | "passwordConfirm";
  label: string;
  onChangeCapture?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
