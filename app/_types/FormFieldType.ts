interface FormFieldConfig {
  name: "email" | "username" | "password" | "subject" | "message";
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  rows?: number;
  autoComplete?: string;
  className?: string;
  fields?: FormFieldConfig[]; // For grouped fields
}
