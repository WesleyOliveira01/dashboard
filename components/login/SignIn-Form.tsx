"use client";
import * as authService from "@/actions/auth/authservice";
import { authData } from "@/interfaces/auth-interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import ReactLoading from "react-loading";
const formSchema = z.object({
  email: z
    .string({ required_error: "O E-mail é obrigatorio" })
    .email({ message: "insira um email valido" })
    .min(5),
  password: z
    .string({ required_error: "A senha é obrigatorio" })
    .min(8, { message: "a senha deve ter pelo menos 8 digitos" }),
});

const SignInForm = () => {
  const { login } = authService;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const signIn = async (data: authData) => {
    try {
      await login(data);
      setLoading(!loading);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Card className="w-[350px]">
      <form onSubmit={handleSubmit(signIn)}>
        <CardHeader className="items-center justify-center">
          <CardTitle>Sign-In title here</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
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
              <Input
                {...register("password")}
                type="password"
                forElement="password"
                label="Senha"
                error_message={errors?.password?.message}
              />
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md  flex items-center justiify-center gap-2">
            {loading ? (
              <ReactLoading
                color="#09090B"
                type="spin"
                width={50}
                height={20}
              />
            ) : (
              <p className="w-full">Entrar</p>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInForm;
