"use client";
import { useForm } from "react-hook-form";
import Input from "./ui/Input";

import { updateUser } from "@/actions/User/UserService";
import { signUpData } from "@/interfaces/auth-interfaces";
import { userSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Button from "./ui/Button";
import { DialogClose, DialogContent } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

interface UserProps {
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
    created_at: Date;
    updated_at: Date;
  };
}

const UpdateUsersForm = ({ user }: UserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const { toast } = useToast();

  const router = useRouter();

  const onFormSubmit = async (formData: signUpData) => {
    formData.id = user?.id;
    try {
      await updateUser(formData);
      toast({
        description: "Usuario atualizado com sucesso",
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
    <DialogContent className="lg:w-[50%] w-[95%]">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              {...register("name")}
              label="Nome"
              forElement="nome"
              defaultValue={user?.name}
              error_message={errors?.name?.message}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              {...register("email")}
              type="email"
              label="E-mail"
              forElement="email"
              defaultValue={user?.email}
              error_message={errors?.email?.message}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <h1 className="font-semibold">Permissões do usuário</h1>
            <div className="lg:flex lg:flex-row lg:justify-around gap-2 lg:w-[65%]">
              {user?.isAdmin ? (
                <>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="default_user"
                      value="default user"
                      className="form-radio text-zinc-950 focus:ring-zinc-950"
                      {...register("permissions")}
                    />
                    <label htmlFor="default_user">Usuário padrão</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="admin"
                      value="admin"
                      defaultChecked
                      className="form-radio text-zinc-950 focus:ring-zinc-950"
                      {...register("permissions")}
                    />
                    <label htmlFor="admin">Administrador</label>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="default_user"
                      value="default user"
                      checked
                      className="form-radio text-zinc-950 focus:ring-zinc-950"
                      {...register("permissions")}
                    />
                    <label htmlFor="default_user">Usuário padrão</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="admin"
                      value="admin"
                      className="form-radio text-zinc-950 focus:ring-zinc-950"
                      {...register("permissions")}
                    />
                    <label htmlFor="admin">Administrador</label>
                  </div>
                </>
              )}
            </div>
            {errors?.permissions && (
              <p className="text-red-500">{errors?.permissions?.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              {...register("password", { required: false })}
              type="password"
              forElement="password"
              label="Senha"
              error_message={errors?.password?.message}
            />
          </div>
        </div>
        <DialogClose asChild>
          <Button
            className="bg-zinc-950 text-zinc-50 p-3 rounded-md shadow-sm"
            type="submit"
          >
            Salvar alteraçôes
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default UpdateUsersForm;
