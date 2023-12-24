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
  simpleNmae:string
  email:string
  isAdmin:boolean
  sub?:string
}
export type { authData, signUpData,IToken,TokenPayload };
