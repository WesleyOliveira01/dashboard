"use client";

import { deleteClient } from "@/actions/client/clientService";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { DialogClose, DialogContent } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

const RemoveClientPopUp = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const removeClient = async (id) => {
    try {
      await deleteClient(id);
      toast({
        description: "Cadastro removido com sucesso",
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
    <DialogContent className="lg:w-[50%] w-[95%]  rounded-md">
      <section className="p-2 flex flex-col gap-5 ">
        <h1 className="text-xl font-semibold">Deseja deletar o cadastro?</h1>
        <div className="flex justify-between gap-2">
          <Button
            className=" border-red-400 border p-2 w-[30%] rounded-md text-red-400"
            onClick={async () => {
              await removeClient(id);
            }}
          >
            Sim
          </Button>
          <DialogClose asChild>
            <Button className="border border-zinc-950 text-zinc-950 p-2 w-[30%] rounded-md ">
              Não
            </Button>
          </DialogClose>
        </div>
      </section>
    </DialogContent>
  );
};

export default RemoveClientPopUp;
