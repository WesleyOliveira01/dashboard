"use server"
import { Iplan } from "@/interfaces/plan-interface";
import prisma from "@/lib/db";
import { verifyToken } from "../utils";
import { redirect } from "next/navigation";
import { Plan } from "@prisma/client";

async function createPlan(planData) {
    await verifyToken()
    const hasPlan = await prisma.plan.findFirst({where:{name:planData.name}})

    if(hasPlan)throw new Error("Plano já cadastrado");
    
    await prisma.plan.create({data:{
        name:planData.name,
        price:planData.valor,
        description:planData.descricao,
        fidelity:planData.fidelidade,
    }})

    redirect("/dashboard/plans");
}

async function getAllPlans(){
    const allPlans = await prisma.plan.findMany({select:{id:true,name:true,price:true,fidelity:true,description:true}})
    return allPlans
}

async function deletePlan(id:string){
    await verifyToken()
    await prisma.plan.delete({
        where: {
          id,
        },
      });
}

async function editPlan(plan) {
     verifyToken()
     await prisma.plan.update({where:{id:plan.id},data:{
        name:plan.name,
        description:plan.descricao,
        price:plan.valor,
        fidelity:plan.fidelidade
     }})
}
export { createPlan, deletePlan, getAllPlans,editPlan };

