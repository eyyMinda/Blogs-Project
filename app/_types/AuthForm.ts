interface AuthFieldConfig {
  name: "email" | "password";
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCapture?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
