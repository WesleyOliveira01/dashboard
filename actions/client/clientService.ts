"use server";

import { redirect } from "next/navigation";
import { formatarData } from "../utils";
import prisma from "@/lib/db";

async function createClient(data: any) {
  const endereco = `${data.endereco},${data.numero} ${data.complemento}, ${data.cep}`;
  const dataDeNascimento = formatarData(data.nascimento);
  const client = {
    nome: data.nome as string,
    cpf_cnpj: Number(data.cpf),
    rg_ie: Number(data.rg),
    email: data.email.toLowerCase() as string,
    telefone: Number(data.telefone),
    nascimento: dataDeNascimento,
    endereco: endereco,
    plan_id:data.plano as string
  };
  await prisma.client.create({
    data: {
      ...client
    },
  });

  redirect("/dashboard/clients");
}

export {createClient}