type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  image: string;
  createdAt: string;
  provider: "credentials" | "github";
  emailVerified: boolean;
};
