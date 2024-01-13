import { signUpData } from "./auth-interfaces";

interface IUserCard {
  id: string;
  name: string;
  email: string;
  permission: boolean;
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
