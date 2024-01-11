"use server"
import prisma from "@/lib/db";
import { IToken, TokenPayload } from "@/interfaces/auth-interfaces";
import { Iplan } from "@/interfaces/plan-interface"
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function createPlan(planData:Iplan) {
    const { value: cookie } = cookies().get("token") as any as IToken;
    const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;
  
    if (!token.isAdmin) throw new Error("Usuario sem permissão");

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
    const allPlans = await prisma.plan.findMany()
    return allPlans
}

async function deletePlan(id:string){
    const { value: cookie } = cookies().get("token") as any as IToken;
    const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;
  
    if (!token.isAdmin) throw new Error("Usuario sem permissão");

    await prisma.plan.delete({
        where: {
          id,
        },
      });
}

export {createPlan,getAllPlans,deletePlan}