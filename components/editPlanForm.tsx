"use client"
import * as planService from "@/actions/plans/planService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plan } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import * as z from "zod";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { DialogClose, DialogContent } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
const formSchema = z.object({
  name: z
    .string({ required_error: "O nome do plano é obrigatorio" })
    .min(3, { message: "insira um nome valido" }),
  descricao: z
    .string({ required_error: "A descrição do plano é obrigatoria" })
    .min(5, { message: "insira uma descrição valida" }),
  valor: z.string().min(1, { message: "insira um valor valido" }),
  fidelidade: z.boolean(),
});

const EditPlanForm = ({ plan }: { plan: Plan }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const { toast } = useToast();
  const router = useRouter();
  const formatValue:string = plan.price.replace(/R\$|,|\s/g, "");
  const { editPlan } = planService;
  console.log(errors)
  const editPlanForm = async (formData: Plan) => {
    formData.id = plan.id;
    console.log(formData)
    try {
      await editPlan(formData);
      toast({
        description: "Plano atualizado com sucesso",
      });
      router.refresh();
    } catch (error) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit(editPlanForm)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              {...register("name")}
              label="Nome do plano"
              forElement="nome"
              defaultValue={plan?.name}
              error_message={errors?.name?.message}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="valor" className="block font-semibold">
              Valor do Plano
            </label>
            <Controller
              name="valor"
              control={control}
              defaultValue={formatValue}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  className="outline-none p-3 focus:border-zinc-200 focus:ring-0 border border-zinc-200 rounded-md"
                  prefix="R$"
                  thousandSeparator
                  onValueChange={(values) => {
                    field.onChange(values.value);
                  }}
                />
              )}
            />
            {errors?.valor && (
              <p className="text-red-500">{errors?.valor?.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="block font-semibold" htmlFor="descricao">
              Descrição do plano
            </label>
            <Textarea
              defaultValue={plan?.description}
              className="focus:border-none"
              id="descricao"
              {...register("descricao")}
              placeholder="Insira a descrição do plano"
            />
            {errors?.descricao && (
              <p className="text-red-500">{errors?.descricao?.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              {...register("fidelidade", { required: false })}
              type="checkbox"
              defaultChecked={plan?.fidelity}
              forElement="fidelidade"
              label="Com fidelidade"
              input_cn="checked:text-zinc-950"
              error_message={errors?.fidelidade?.message}
            />
          </div>
        </div>
        
          <Button
            className="bg-zinc-950 text-zinc-50 p-3 rounded-md shadow-sm"
            type="submit"
          >
            Salvar alteraçôes
          </Button>
       
      </form>
    </DialogContent>
  );
};

export default EditPlanForm;
