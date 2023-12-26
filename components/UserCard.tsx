"use client"
import { IUserCard } from "@/interfaces/auth-interfaces";
import { BadgeX } from "lucide-react";
import Link from "next/link";
import Button from "./ui/Button";
import * as authService from "@/actions/auth/authservice";

const UserCard = ({ name, email, permission, id }: IUserCard) => {
  const {deleteUser} = authService
  return (
    <li className="w-full">
      <section className="shadow-md p-2 rounded-md flex justify-evenly items-center">
        <Link href={`/dashboard/users/${id}`} as={`/dashboard/users/${id}`}>
          <ul className="flex justify-evenly gap-5 font-semibold">
            <li>{name}</li>
            <li>{email}</li>
            <li>{permission ? "administrador" : "Usuario padrao"}</li>
          </ul>
        </Link>
        <Button onClick={async () => await deleteUser(id)}>
          <BadgeX size={20} color="red" />
        </Button>
      </section>
    </li>
  );
};

export default UserCard;
