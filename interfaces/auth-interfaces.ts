interface authData {
  email: string;
  password: string;
}

interface signUpData {
  id?:string
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


export type { authData, signUpData,IToken,TokenPayload};
