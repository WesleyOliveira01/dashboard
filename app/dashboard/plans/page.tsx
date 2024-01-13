import * as planService from "@/actions/plans/planService";

import Container from "@/components/ui/Container";

import RenderPlans from "@/components/RenderPlans";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import Loading from "../loading";

const Plans = async () => {
  const { getAllPlans } = planService;
  const plans = await getAllPlans();
  return (
    <Container>
      <section className="p-3 font-semibold flex justify-between w-full">
        <h1 className="text-xl">Planos cadastrados</h1>

        <Link href="/dashboard/plans/newPlan" className="flex gap-2">
          <span className="mobile:hidden">Cadastrar novo plano</span>{" "}
          <BadgePlus color="green" />
        </Link>
      </section>
      {plans.length == 0 ? <Loading /> : <RenderPlans plans={plans} />}
    </Container>
  );
};

export default Plans;
