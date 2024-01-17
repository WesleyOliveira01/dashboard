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
  nome:z.string(),
  cpf:z.string(),
  rg:z.string(),
  email:z.string().email(),
  telefone:z.string(),
  endereco:z.string(),
  numero:z.number(),
  complemento:z.string(),
  cep:z.string(),
  plano:z.string(),
  instalacao:z.boolean(),
  nascimento:z.string(),
})
export {planSchema,userSchema,signInSchema,signUpSchema,clientSchema}