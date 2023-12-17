interface ContactInfo extends DataObject {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFieldConfig {
  name: "email" | "username" | "subject" | "message";
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  rows?: number;
  className?: string;
  fields?: ContactFieldConfig[]; // For grouped fields
}
