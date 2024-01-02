"use client";
import * as authService from "@/actions/auth/authservice";
import { IUserCard } from "@/interfaces/auth-interfaces";
import { BadgeX } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import Button from "./ui/Button";
import PopUp from "./ui/PopUp";

const UserCard = ({ name, email, permission, id }: IUserCard) => {
  const { deleteUser } = authService;
  const [error, setError] = useState<string | null>(null);
  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
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
      {error && <PopUp isError={true} message={error} />}
    </>
  );
};

export default UserCard;
