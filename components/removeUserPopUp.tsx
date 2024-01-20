"use client";
import { deleteUser } from "@/actions/User/UserService";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { DialogClose, DialogContent } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

const RemoveUserPopUp = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      toast({
        description: "Usuario removido com sucesso",
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
        <h1 className="text-xl font-semibold">Deseja deletar o usuario?</h1>
        <div className="flex justify-between gap-2">
          <Button
            className=" border-red-400 border p-2 w-[30%] rounded-md text-red-400"
            onClick={async () => {
              await removeUser(id);
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

export default RemoveUserPopUp;
