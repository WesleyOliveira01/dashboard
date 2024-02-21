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
    pesquisa: data.pesquisa,
    instalacao: data.instalacao,
  };
  await prisma.client.create({
    data: {
      ...client,
    },
  });

  redirect("/dashboard/clients");
}

type clientSeach = {
  google: number;
  indicacao: number;
  carroDeSom: number;
  panfleto: number;
  jaFoiClient: number;
};

const getAllSearchs = async () => {
  const allClients = await prisma.client.findMany({});

  let search: clientSeach = {
    google: 0,
    indicacao: 0,
    carroDeSom: 0,
    panfleto: 0,
    jaFoiClient: 0,
  };

  allClients.forEach((client) => {
    if (client.pesquisa === "Google") search.google++;
    if (client.pesquisa === "Indicação") search.indicacao++;
    if (client.pesquisa === "Carro de som") search.carroDeSom++;
    if (client.pesquisa === "Panfleto") search.panfleto++;
    if (client.pesquisa === "já é/foi cliente") search.jaFoiClient++;
  });

  return search;
};

async function updateClient(id: string, data: any) {
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
    pesquisa: data.pesquisa,
    instalacao: data.instalacao,
  };
  await prisma.client.update({
    where: {
      id: id,
    },
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

async function getClientByID(id: string) {
  const client = await prisma.client.findFirst({
    where: {
      id: id,
    },
    select: {
      created_at: true,
      nome: true,
      telefone: true,
      email: true,
      cpf_cnpj: true,
      rg_ie: true,
      endereco: true,
      vencimento: true,
      data_instalacao: true,
      id: true,
      instalacao: true,
      plan: {
        select: { name: true, description: true, price: true, fidelity: true },
      },
    },
  });

  return client;
}

async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
  redirect("/dashboard/clients");
}

async function setInstallData(data: { id: string; data: string }) {
  await prisma.client.update({
    where: { id: data.id },
    data: {
      data_instalacao: data.data,
    },
  });
}
export {
  createClient,
  deleteClient,
  getAllSearchs,
  getClientByID,
  getClients,
  setInstallData,
};
