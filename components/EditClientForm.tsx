"use client";
import { Controller, useForm } from "react-hook-form";
import Input from "./ui/Input";

import { updateClient } from "@/actions/client/clientService";
import { Iplan } from "@/interfaces/plan-interface";
import { clientSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import * as z from "zod";
import Button from "./ui/Button";
import Select from "./ui/Select";
import { DialogClose, DialogContent } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "./ui/use-toast";

const UpdateClientForm = ({
  client,
  plans,
}: {
  client: any;
  plans: Iplan[];
}) => {
  const endereco = client?.endereco.split(",");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const { toast } = useToast();

  const router = useRouter();

  const getAddressByCep = async (cep: string) => {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    setValue("endereco", data?.logradouro);
  };
  const [pj, setPj] = useState<boolean>(client.cpf_cnpj > 11);
  const onFormSubmit = async (formData: any) => {
    formData.id = client?.id;
    try {
      await updateClient(formData);
      toast({
        description: "Usuario atualizado com sucesso",
      });
      router.refresh();
    } catch (error) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid w-full items-center gap-4">
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
                defaultValue={client?.nome}
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
                    defaultValue={client?.cpf_cnpj}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                )}
              />
              <Input
                {...register("rg")}
                defaultValue={client?.rg_ie}
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
                defaultValue={client?.nome}
                error_message={errors?.nome?.message}
              />
              <Input
                {...register("rg")}
                label="RG"
                forElement="rg"
                defaultValue={client?.rg_ie}
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
                    defaultValue={client?.cpf_cnpj}
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
                    defaultValue={client?.nascimento}
                    placeholder="dd/mm/aaaa"
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
            defaultValue={client?.email}
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
                defaultValue={client?.telefone}
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
              defaultValue={endereco[0]}
              error_message={errors?.endereco?.message}
            />
            <Input
              {...register("numero")}
              label="Numero"
              box_cn="w-[10%]"
              forElement="numero"
              defaultValue={endereco[1]}
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
                  defaultValue={endereco[2]}
                  customInput={Input}
                  onBlur={(e) => {
                    const cep = e.target.value;
                    if (cep.length === 9) {
                      getAddressByCep(cep);
                    }
                  }}
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
              onChange={(e) => setValue("plano", e.target.value)}
              label="Planos"
              forElement="plano"
              defaultValue={client?.plano}
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
              defaultValue={client?.vencimento}
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
          <section className="flex gap-1 items-center">
            <Select
              {...register("pesquisa")}
              label="Como nos conheceu?"
              forElement="pesquisa"
              defaultValue={client?.pesquisa}
              error_message={errors?.pesquisa?.message}
              select_cn="rounded-md border-zinc-200 focus:border-none active:border-none w-[70%]"
            >
              <option className="bg-white" value="Google">
                Google
              </option>
              <option className="bg-white" value="Indicação">
                Indicação
              </option>
              <option className="bg-white" value="Planfeto">
                Panfleto
              </option>
              <option className="bg-white" value="Já é/foi cliente">
                Já é/foi cliente
              </option>
              <option className="bg-white" value="Carro de som">
                Carro de som
              </option>
            </Select>
            <Controller
              name="instalacao"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-[30%]"
                >
                  <div className="flex  gap-4">
                    <label htmlFor="a vista">
                      <RadioGroupItem id="a vista" value="a vista" /> 150 a
                      vista
                    </label>
                    <label htmlFor="a prazo">
                      <RadioGroupItem id="a prazo" value="a prazo" /> 195 em até
                      3x
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </section>
          <DialogClose>
            <Button
              button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md   "
              type="submit"
            >
              Enviar dados
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default UpdateClientForm;
