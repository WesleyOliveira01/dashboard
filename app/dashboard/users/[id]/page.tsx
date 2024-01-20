import { getUserByID } from "@/actions/User/UserService";
import UpdateUsersForm from "@/components/EditUserForm";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BadgeX, History } from "lucide-react";
import RemoveUserPopUp from "./../../../../components/removeUserPopUp";

const UserDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const user = await getUserByID(id);

  return (
    <Container>
      <section className="w-full flex items-center justify-between p-4">
        <h1 className="font-semibold lg:text-2xl text-xl text-zinc-950">
          Dados do usuarios
        </h1>
      </section>
      <ul className="lg:w-[70%] w-full shadow-md p-4 rounded-md [&>*]:p-2 [&>*]:flex [&>*]:gap-2">
        <li>
          <h2 className="font-semibold">Nome:</h2> {user?.name}
        </li>
        <li>
          <h2 className="font-semibold">E-mail:</h2> {user?.email}
        </li>
        <li>
          <h2 className="font-semibold">Permissão:</h2>{" "}
          {user?.isAdmin ? "Admistrador" : "Usuario padrão"}
        </li>

        <li className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger>
              <Button className="border border-zinc-950 text-zinc-950 py-2 px-3 rounded-md shadow-md flex items-center lg:gap-2">
                <span className="mobile:hidden font-semibold">Atualizar dados</span>
                <History size={20} color="#09090B" />
              </Button>
            </DialogTrigger>
            <UpdateUsersForm user={user} />
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button className="flex items-center lg:gap-2 border border-red-500 text-red-500  py-2 px-3 rounded-md shadow-md">
                <span className="mobile:hidden font-semibold">
                  Deletar Usuario
                </span>
                <BadgeX size={20} color="red" />
              </Button>
            </DialogTrigger>
            <RemoveUserPopUp id={id} />
          </Dialog>
        </li>
      </ul>
    </Container>
  );
};

export default UserDetails;
