type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  image: string;
  createdAt: string | Date;
  provider: "credentials" | "github";
  emailVerified: boolean;
  updatedAt?: string | Date;
};
