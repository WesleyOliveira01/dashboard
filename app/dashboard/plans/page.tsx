import * as planService from "@/actions/plans/planService";

import Container from "@/components/ui/Container";

import RenderPlans from "@/components/RenderPlans";
import { Plan } from "@prisma/client";
import Link from "next/link";
import Loading from "../loading";
import { BadgePlus } from "lucide-react";

const Plans = async () => {
  const { getAllPlans } = planService;
  const plans: Plan[] = await getAllPlans();
  return (
    <Container>
      <section className="p-3 font-semibold flex justify-between w-full">
        <h1 className="text-xl">Planos cadastrados</h1>
        <h1 className="cursor-pointer">
          <Link href="/dashboard/plans/newPlan"><span className="mobile:hidden">Cadastrar novo plano</span> <BadgePlus color="green" /></Link>
        </h1>
      </section>
      {plans.length == 0 ? <Loading /> : <RenderPlans plans={plans} />}
    </Container>
  );
};

export default Plans;
