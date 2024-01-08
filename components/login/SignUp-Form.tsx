"use client";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import * as authService from "@/actions/auth/authservice";
import { signUpData } from "@/interfaces/auth-interfaces";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
const formSchema = z.object({
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

const SignUpForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const { toast } = useToast();
  const router = useRouter();
  const { createUser } = authService;

  const onFormSubmit = async (formData: signUpData) => {
    try {
      await createUser(formData);
      toast({
        description: "Usuario criado com sucesso",
      });
      router.refresh();
    } catch (error) {
      toast({
        description: error.message,
        variant:"destructive"
      });
    }
  };

  return (
    <Card className="lg:w-[50%] w-[95%]">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardHeader className="items-center justify-center">
          <CardTitle>Sign-up title here</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("name")}
                label="Nome"
                forElement="nome"
                error_message={errors?.name?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("email")}
                type="email"
                label="E-mail"
                forElement="email"
                error_message={errors?.email?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <h1 className="font-semibold">Permissões do usuário</h1>
              <div className="lg:flex lg:flex-row lg:justify-around lg:w-[50%]">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="default_user"
                    value="default user"
                    className="form-radio text-zinc-950 focus:ring-zinc-950"
                    {...register("permissions")}
                  />
                  <label htmlFor="default_user">Usuário padrão</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="admin"
                    value="admin"
                    className="form-radio text-zinc-950 focus:ring-zinc-950"
                    {...register("permissions")}
                  />
                  <label htmlFor="admin">Administrador</label>
                </div>
              </div>
              {errors?.permissions && (
                <p className="text-red-500">{errors?.permissions?.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("password")}
                type="password"
                forElement="password"
                label="Senha"
                error_message={errors?.password?.message}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md   ">
            Criar usuario
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
