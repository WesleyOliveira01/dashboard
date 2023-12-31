import * as authService from "@/actions/auth/authservice";
import UserCard from "@/components/UserCard";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

const Users = async () => {
  const { getAllUsers } = authService;
  const users = await getAllUsers();
  return (
    <main className="flex flex-col items-center justify-center p-2">
      <section className="w-full flex items-center justify-between p-4">
        <h1 className="font-semibold text-2xl text-zinc-950">
          Painel de usuarios
        </h1>

        <Link href="/dashboard/signUp" className="flex font-semibold gap-2">
          Cadastrar novo usuario
          <UserRoundPlus size={20} color="#09090B" />
        </Link>
      </section>

      <ul className="flex flex-col gap-2 lg:w-[50%] w-[90%]">
        {users.map(({ id, name, email, isAdmin }) => (
          <UserCard
            key={id}
            id={id}
            name={name}
            email={email}
            permission={isAdmin}
          />
        ))}
      </ul>
    </main>
  );
};

export default Users;
