import Button from "@/components/ui/Button";
import { BadgeX } from "lucide-react";

const Users = () => {
  return (
    <main className="flex flex-col items-center justify-center p-2">
      <h1 className="font-semibold text-xl text-zinc-950">
        Painel de usuarios
      </h1>

      <ul className="flex flex-col gap-2">
        <li>
          <section className="shadow-md p-2 rounded-md flex items-center gap-1">
            <ul className="flex justify-evenly text-sm">
              <li> Nome do usuario</li>
              <li> email do usuario</li>
              <li> permissão do usuario</li>
            </ul>
            <Button>
              <BadgeX size={20} color="red" />
            </Button>
          </section>
        </li>
        <li>
          <section className="shadow-md p-2 rounded-md flex items-center gap-1">
            <ul className="flex justify-evenly text-sm">
              <li> Nome do usuario</li>
              <li> email do usuario</li>
              <li> permissão do usuario</li>
            </ul>
            <Button>
              <BadgeX size={20} color="red" />
            </Button>
          </section>
        </li>
        <li>
          <section className="shadow-md p-2 rounded-md flex items-center gap-1">
            <ul className="flex justify-evenly text-sm">
              <li> Nome do usuario</li>
              <li> email do usuario</li>
              <li> permissão do usuario</li>
            </ul>
            <Button>
              <BadgeX size={20} color="red" />
            </Button>
          </section>
        </li>
      </ul>
    </main>
  );
};

export default Users;
