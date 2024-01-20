import { getAllUsers } from "@/actions/User/UserService";
import Container from "@/components/ui/Container";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import RenderUsers from "./../../../components/RenderUsers";

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
      <RenderUsers users={users} />
    </Container>
  );
};

export default Users;
