"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Button from "@/components/ui/Button";
import { BadgeX, PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

import * as planService from "@/actions/plans/planService";
import { DialogTrigger } from "@/components/ui/dialog";
import EditPlanForm from "./editPlanForm";
import { Dialog } from "./ui/dialog";
import { IRenderPlans, Iplan } from "@/interfaces/plan-interface";



const RenderPlans = ({ plans }:IRenderPlans) => {
  const { deletePlan } = planService;
  const { toast } = useToast();
  const router = useRouter();
  const removePlan = async (id: string) => {
    try {
      await deletePlan(id);
      toast({
        description: "Plano removido com sucesso",
      });
      router.refresh();
    } catch (e) {
      toast({
        description: e.message,
        variant: "destructive",
      });
    }
  };
  return (
    <section className=" w-[90%] ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="mobile:hidden">Com</span> fidelidade
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="mobile:hidden">Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map(
            (plan:Iplan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.fidelity ? "Sim" : "Não"}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell className="mobile:hidden">
                  {plan.description}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button>
                        <PencilRuler color="green" />
                      </Button>
                    </DialogTrigger>
                    <EditPlanForm plan={plan} />
                  </Dialog>
                  <Button
                    onClick={async () => {
                      await removePlan(plan.id);
                    }}
                  >
                    <BadgeX color="red" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default RenderPlans;
