import * as authService from "@/actions/auth/authservice";
import Container from "@/components/ui/Container";
import Button from '@/components/ui/Button'

const UserDetails = async ({ params }: { params: { id: string } }) => {
  const { getUserByID } = authService;
  const id = params.id;
  const user = await getUserByID(id);
  return (
    <Container>
        <section className="w-full flex items-center justify-between p-4">
        <h1 className="font-semibold text-2xl text-zinc-950">
          Dados do usuarios
        </h1>

        <Button>
            Atualizar dados
        </Button>
      </section>
      <ul className="w-[70%] shadow-md p-4 rounded-md [&>*]:p-2 [&>*]:flex [&>*]:gap-2">
        <li><h2 className="font-semibold">Nome:</h2> {user?.name}</li>
        <li><h2 className="font-semibold">E-mail:</h2> {user?.email}</li>
        <li><h2 className="font-semibold">Permissão:</h2> {user?.isAdmin ? "Admistrador" : "Usuario padrão"}</li>
      </ul>
    </Container>
  );
};

export default UserDetails;
