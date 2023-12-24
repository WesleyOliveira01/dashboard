import * as authService from "@/actions/auth/authservice";
import UserCard from "@/components/UserCard";

const Users = async () => {
  const { getAllUsers } = authService;
  const users = await getAllUsers();
  return (
    <main className="flex flex-col items-center justify-center p-2">
      <h1 className="font-semibold text-xl text-zinc-950">
        Painel de usuarios
      </h1>

      <ul className="flex flex-col gap-2 lg:w-[45%] w-[90%]">
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
