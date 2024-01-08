import * as authService from "@/actions/auth/authservice";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { History } from "lucide-react";


const UserDetails = async ({ params }: { params: { id: string } }) => {
  const { getUserByID } = authService;
  const id = params.id;
  const user = await getUserByID(id);

  return (
    <Container>
      <section className="w-full flex items-center justify-between p-4">
        <h1 className="font-semibold lg:text-2xl text-xl text-zinc-950">
          Dados do usuarios
        </h1>
        <Dialog>
          <DialogTrigger>
            <Button className="flex items-center lg:gap-2">
              <span className="mobile:hidden font-semibold">
                Atualizar dados
              </span>
              <History size={20} color="#09090B" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form action="">
              <h1>dados do usuario</h1>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Salvar alteraçôes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
      </ul>
    </Container>
  );
};

export default UserDetails;
