"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { formatarData } from "../utils";

async function createClient(data: any) {
  const endereco = `${data.endereco},${data.numero} ${data.complemento}, ${data.cep}`;
  const dataDeNascimento = formatarData(data.nascimento);
  const client = {
    nome: data.nome as string,
    cpf_cnpj: data.cpf,
    rg_ie: data.rg,
    email: data.email.toLowerCase() as string,
    telefone: data.telefone,
    nascimento: dataDeNascimento,
    endereco: endereco,
    plan_id: data.plano as string,
    vencimento: data.vencimento,
  };
  await prisma.client.create({
    data: {
      ...client,
    },
  });

  redirect("/dashboard/clients");
}

async function getClients() {
  let allClients = await prisma.client.findMany({
    select: {
      nome: true,
      telefone: true,
      email: true,
      endereco: true,
      vencimento: true,
      id: true,
      plan: {
        select: { name: true, description: true, price: true, fidelity: true },
      },
    },
  });
  
  return allClients;
}

export { createClient, getClients };
