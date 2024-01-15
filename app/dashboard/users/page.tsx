import { getAllUsers } from "@/actions/User/UserService";
import UserCard from "@/components/UserCard";
import Container from "@/components/ui/Container";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

const Users = async () => {
  const users = await getAllUsers();
  return (
    <Container>
      <section className="w-full flex items-center justify-between lg:p-4 p-2">
        <h1 className="font-semibold lg:text-2xl text-xl text-zinc-950">
          Painel de usuarios
        </h1>

        <Link href="/dashboard/signUp" className="flex font-semibold lg:gap-2">
          <span className="hidden lg:block">Cadastrar novo usuario</span>
          <UserRoundPlus size={20} color="green" />
        </Link>
      </section>

      <ul className="flex flex-col gap-2 lg:w-[50%] w-[98%]">
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
    </Container>
  );
};

export default Users;
