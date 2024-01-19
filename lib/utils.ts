import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// schemas

const planSchema = z.object({
  name: z
    .string({ required_error: "O nome do plano é obrigatorio" })
    .min(3, { message: "insira um nome valido" }),
  descricao: z
    .string({ required_error: "A descrição do plano é obrigatoria" })
    .min(5, { message: "insira uma descrição valida" }),
  valor: z.string().min(1, { message: "insira um valor valido" }),
  fidelidade: z.boolean(),
});

const userSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatorio" })
    .min(3, { message: "insira um nome valido" }),
  email: z
    .string({ required_error: "O E-mail é obrigatorio" })
    .email({ message: "insira um email valido" })
    .min(5, { message: "insira um email valido" }),
  password: z.string(),
  permissions: z
    .string({ invalid_type_error: "Selecione uma opção válida" })
    .refine((value) => {
      return ["default user", "admin"].includes(value);
    })
    .transform((value) => value === "admin"),
});

const signInSchema = z.object({
  email: z
    .string({ required_error: "O E-mail é obrigatorio" })
    .email({ message: "insira um email valido" })
    .min(5),
  password: z
    .string({ required_error: "A senha é obrigatorio" })
    .min(8, { message: "a senha deve ter pelo menos 8 digitos" }),
});


const signUpSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatorio" })
    .min(3, { message: "insira um nome valido" }),
  email: z
    .string({ required_error: "O E-mail é obrigatorio" })
    .email({ message: "insira um email valido" })
    .min(5, { message: "insira um email valido" }),
  password: z
    .string({ required_error: "A senha é obrigatorio" })
    .min(8, { message: "a senha deve ter pelo menos 8 digitos" }),
  permissions: z
    .string({ invalid_type_error: "Selecione uma opção válida" })
    .refine((value) => {
      return ["default user", "admin"].includes(value);
    })
    .transform((value) => value === "admin"),
});

const clientSchema = z.object({
  nome: z
    .string({ required_error: "O Nome/Razão social é obrigatorio" })
    .min(4, { message: "insira um valor valido" }),
  cpf: z
    .string({ required_error: "Campo Obrigatorio" })
    .min(11, { message: "Insira um valor valido" }),
  rg: z.string().optional(),
  email: z
    .string({ required_error: "O E-mail é obrigatorio" })
    .email({ message: "Insira um email valido" })
    .min(5, { message: "Insira um email valido" }),
  telefone: z
    .string({ required_error: "O Telefone é obrigatorio" })
    .min(11, { message: "Insira um valor valido" }),
  endereco: z
    .string({ required_error: "O Endereço é obrigatorio" })
    .min(4, { message: "Insira um valor valido" }),
  numero: z
    .string({ required_error: "O Número é obrigatorio" })
    .min(1, { message: "Insira um valor valido" }),
  complemento: z.string().optional(),
  cep: z
    .string({ required_error: "O CEP é obrigatorio" })
    .min(8, { message: "Insira um valor valido" }),
  plano: z.string({ required_error: "O Plano é obrigatorio" }),
  instalacao: z.enum(["a vista", "a prazo"]),
  nascimento: z.string().optional(),
  vencimento: z.string({ required_error: "a Data de vencimento é obrigatoria" }),
});
export {planSchema,userSchema,signInSchema,signUpSchema,clientSchema}