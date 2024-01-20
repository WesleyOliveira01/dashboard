import { signUpData } from "./auth-interfaces";

interface IUserCard {
  users: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }[];
}

interface IuserDetails {
  id: string;
  name: string;
  simpleName: string;
  email: string;
  isAdmin: boolean;
}

interface UserProps extends signUpData {
  id: string;
}
export type { IUserCard, UserProps, IuserDetails };
