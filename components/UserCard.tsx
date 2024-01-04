"use client";
import * as authService from "@/actions/auth/authservice";
import { IUserCard } from "@/interfaces/auth-interfaces";
import { BadgeX } from "lucide-react";
import Link from "next/link";
import Button from "./ui/Button";
import { useToast } from "./ui/use-toast";

const UserCard = ({ name, email, permission, id }: IUserCard) => {
  const { deleteUser } = authService;
  const { toast } = useToast()
  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
      toast({
        description:"Usuario removido com sucesso",
      })
    } catch (e) {
      toast({
        description:e.message,
        variant: "destructive"
      })
    }
  };

  
  return (
    <>
      <li className="w-full">
        <section className="shadow-md lg:p-2 rounded-md flex justify-between items-center">
          <Link href={`/dashboard/users/${id}`}>
            <ul className="flex justify-between mobile:text-sm  gap-5 px-4 font-semibold">
              <li>{name}</li>
              <li className="mobile:hidden">{email}</li>
              <li>{permission ? "administrador" : "Usuario padrao"}</li>
            </ul>
          </Link>
          <Button onClick={async () => await removeUser(id)}>
            <BadgeX size={20} color="red" />
          </Button>
        </section>
      </li>
    </>
  );
};

export default UserCard;
