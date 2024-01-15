"use client";
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

import { login } from "@/actions/auth/authservice";
import { signInSchema } from "@/lib/utils";
import ReactLoading from "react-loading";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
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
                color="#ffffff"
                type="spin"
                width={20}
                height={10}
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
