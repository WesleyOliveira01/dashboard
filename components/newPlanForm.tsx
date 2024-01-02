"use client";
import { useForm } from "react-hook-form";
import Button from "./ui/Button";
import Input from "./ui/Input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import * as authService from "@/actions/auth/authservice";
import { signUpData } from "@/interfaces/auth-interfaces";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z
    .string({ required_error: "O nome do plano é obrigatorio" })
    .min(3, { message: "insira um nome valido" }),
  descricao: z
    .string({ required_error: "A descrição do plano é obrigatoria" })
    .min(5, { message: "insira uma descrição valida" }),
  valor: z
    .number({ required_error: "O valor do plano é obrigatorio" })
    .min(1, { message: "insira um valor valido" }),
  fidelidade: z.boolean(),
});

const NewPlanForm = () => {
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

  const { createUser } = authService;
  const onFormSubmit = async (formData: signUpData) => {
    await createUser(formData);
  };
  return (
    <Card className="lg:w-[50%] w-[95%]">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CardHeader className="items-center justify-center">
          <CardTitle>create new Plan form title here</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("name")}
                label="Nome do plano"
                forElement="nome"
                error_message={errors?.name?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("valor",{setValueAs:(value) => Number(value)})}
                label="Valor do plano"
                forElement="valor"
                error_message={errors?.valor?.message}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="block font-semibold" htmlFor="descricao">
                Descrição do plano
              </label>
              <Textarea
                id="descricao"
                {...register("descricao")}
                placeholder="Insira a descrição do plano"
              />
              {errors?.descricao && (
                <p className="text-red-500">{errors?.descricao?.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("fidelidade", { required: false })}
                type="checkbox"
                forElement="fidelidade"
                label="Com fidelidade"
                error_message={errors?.fidelidade?.message}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md   ">
            Criar Plano
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewPlanForm;
