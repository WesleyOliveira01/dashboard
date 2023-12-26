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

interface IToken{
  name:string
  path:string
  value:string
}

interface TokenPayload{
  name:string
  simpleName?:string
  email:string
  isAdmin:boolean
  sub?:string
}

interface IUserCard{
  id:string
  name:string
  email:string
  permission:boolean
}
export type { authData, signUpData,IToken,TokenPayload,IUserCard };
