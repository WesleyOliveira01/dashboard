interface authData {
  email: string;
  password: string;
}

interface signUpData {
  name: string;
  email: string;
  password: string;
  permissions: boolean;
}

export type { authData, signUpData };
