"use client";
import { createClient } from "@/actions/client/clientService";
import { IRenderPlans } from "@/interfaces/plan-interface";
import { clientSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { Card, CardContent, CardHeader } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "./ui/use-toast";

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
  const router = useRouter();
  console.log(errors);
  const onFormSubmit = async (data: any) => {
    try {
      await createClient(data);
      toast({
        description: "Client cadastrado com sucesso",
      });
      router.refresh();
    } catch (e) {
      toast({
        description: e.message,
        variant: "destructive",
      });
    }
  };
  const [pj, setPj] = useState<boolean>(false);
  return (
    <Card className="lg:w-[60%] w-[95%]">
      <CardHeader>
        <h1 className="text-xl text-center font-semibold">New client form</h1>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input
            defaultChecked={pj}
            onChange={() => setPj(!pj)}
            label="Cadastro de Pessoa Juridica"
            type="checkbox"
            forElement="pj"
            input_cn="checked:text-zinc-950"
            box_cn="flex py-3 flex-row-reverse items-center justify-end"
          />
          {pj ? (
            <>
              <Input
                {...register("nome")}
                label="Razão social"
                forElement="nome"
                error_message={errors?.nome?.message}
              />
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <PatternFormat
                    label="CNPJ"
                    forElement="cpf"
                    error_message={errors?.cpf?.message}
                    format="##.###.###/####-##"
                    placeholder="00.000.000/0000-00"
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                )}
              />
              <Input
                {...register("rg")}
                label="IE"
                forElement="ie"
                error_message={errors?.rg?.message}
              />
            </>
          ) : (
            <>
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
                    placeholder="000.000.000-00"
                    error_message={errors?.cpf?.message}
                    format="###.###.###-##"
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
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
                    required={false}
                    error_message={errors?.nascimento?.message}
                    format="##/##/####"
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                )}
              />
            </>
          )}
          <Input
            {...register("email")}
            label="E-mail"
            forElement="email"
            error_message={errors?.email?.message}
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
                onValueChange={(values) => {
                  field.onChange(values.value);
                }}
              />
            )}
          />
          <section className="flex gap-1">
            <Input
              {...register("endereco")}
              label="Endereço"
              forElement="endereco"
              box_cn="w-[50%]"
              error_message={errors?.endereco?.message}
            />
            <Input
              {...register("numero")}
              label="Numero"
              box_cn="w-[10%]"
              forElement="numero"
              error_message={errors?.numero?.message}
            />
            <Input
              {...register("complemento")}
              label="Complemento"
              box_cn="w-[20%]"
              forElement="complemento"
              error_message={errors?.complemento?.message}
            />
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <PatternFormat
                  label="CEP"
                  forElement="cep"
                  box_cn="w-[20%]"
                  error_message={errors?.cep?.message}
                  format="#####-###"
                  customInput={Input}
                  onValueChange={(values) => {
                    field.onChange(values.value);
                  }}
                />
              )}
            />
          </section>
          <section className="flex gap-1">
            <Select
              {...register("plano")}
              label="Planos"
              forElement="plano"
              error_message={errors?.plano?.message}
              select_cn="rounded-md border-zinc-200 focus:border-none active:border-none w-[70%]"
            >
              {plans.map((plan) => (
                <option className="bg-white" key={plan.id} value={plan.id}>
                  <span>{plan.name}</span>
                  {plan.fidelity && <span> COM FIDELIDADE </span>}
                  <span> POR </span>
                  <span>{plan.price}</span>
                </option>
              ))}
            </Select>
            <Select
              {...register("vencimento")}
              label="Data de vencimento"
              forElement="vencimento"
              error_message={errors?.vencimento?.message}
              select_cn="rounded-md border-zinc-200 focus:border-none active:border-none w-[30%]"
            >
              <option className="bg-white" value="10">
                Todo dia 10
              </option>
              <option className="bg-white" value="20">
                Todo dia 20
              </option>
            </Select>
          </section>
          <Controller
            name="instalacao"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex  gap-4">
                  <label htmlFor="a vista">
                    <RadioGroupItem id="a vista" value="a vista" /> 150 a vista
                  </label>
                  <label htmlFor="a prazo">
                    <RadioGroupItem id="a prazo" value="a prazo" /> 195 em até
                    3x
                  </label>
                </div>
              </RadioGroup>
            )}
          />
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
