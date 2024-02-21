"use client";

import { setInstallData } from "@/actions/client/clientService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { DialogClose, DialogContent } from "./ui/dialog";
import { toast } from "./ui/use-toast";

const dataSchema = z.object({
  data_instalacao: z.coerce
    .date({ invalid_type_error: "valor invalido" })
    .refine((value) => new Date(value), {
      message: "Data inválida",
    }),
});

const SelectDate = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const onFormSubmit = async (data: any) => {
    const dia = data.data_instalacao.getDay();
    const mes = data.data_instalacao.getMonth() + 1;
    const ano = data.data_instalacao.getFullYear();

    const instalacao = `${dia}-${mes}-${ano}`;
    const updateData = {
      id: id as string,
      data: instalacao,
    };
    try {
      await setInstallData(updateData);
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
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          type="date"
          label="Data de instalação"
          name="date"
          forElement="data_instalacao"
          {...register("data_instalacao")}
          error_message={errors.data_instalacao?.message}
        />
        <DialogClose>
          <Button className="text-zinc-50 font-semibold bg-green-400 p-2 w-full rounded">
            Adicionar Data da Instalação
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default SelectDate;
