"use client";
import { IRenderPlans } from "@/interfaces/plan-interface";
import { clientSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { Card, CardContent, CardHeader } from "./ui/card";

const NewClientForm = ({ plans }: IRenderPlans) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onFormSubmit = (data: any) => {
    try {
      console.log(data)
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <Card className="lg:w-[50%] w-[95%]">
      <CardHeader>
        <h1 className="text-xl text-center font-semibold">New client form</h1>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input
            {...register("nome")}
            label="Nome"
            forElement="nome"
            error_message={errors?.nome?.message}
          />
          <Input
            {...register("rg")}
            label="RG"
            forElement="rg"
            error_message={errors?.rg?.message}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <PatternFormat
                label="CPF"
                forElement="cpf"
                error_message={errors?.cpf?.message}
                format="###.###.###-##"
                customInput={Input}
              />
            )}
          />
          <Controller
            name="nascimento"
            control={control}
            render={({ field }) => (
              <PatternFormat
                label="Data de nascimento"
                forElement="data"
                error_message={errors?.nascimento?.message}
                format="##/##/####"
                customInput={Input}
              />
            )}
          />
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <PatternFormat
                label="Telefone"
                forElement="telefone"
                error_message={errors?.telefone?.message}
                format="(##) #####-####"
                customInput={Input}
              />
            )}
          />
          <Input
            {...register("endereco")}
            label="Endereço"
            forElement="endereco"
            error_message={errors?.endereco?.message}
          />
          <Input
            {...register("numero")}
            label="Numero"
            forElement="numero"
            error_message={errors?.numero?.message}
          />
          <Input
            {...register("complemento")}
            label="Complemento"
            forElement="complemento"
            error_message={errors?.complemento?.message}
          />
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <PatternFormat
                label="CEP"
                forElement="cep"
                error_message={errors?.cep?.message}
                format="#####-###"
                customInput={Input}
              />
            )}
          />
          <Select
            {...register("plano")}
            label="Planos"
            forElement="plano"
            error_message={errors?.plano?.message}
            select_cn="rounded-md border-zinc-200 focus:border-none active:border-none"
          >
            {plans.map((plan) => (
              <option className="bg-white" key={plan.id} value={plan.id}>
                <span>{plan.name}</span>
                {plan.fidelity && <span>com fidelidade</span>}
                <span> POR </span>
                <span>{plan.price}</span>
              </option>
            ))}
          </Select>
          <Button
            button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md   "
            type="submit"
          >
            Enviar dados
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewClientForm;
