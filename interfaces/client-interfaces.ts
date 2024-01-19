interface IClients {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  vencimento: string;
  plan: {
    name: string;
    description: string;
    price: string;
    fidelity: boolean;
  };
}

interface IRenderClients{
    clients:IClients[]
} 

export type {IClients,IRenderClients}