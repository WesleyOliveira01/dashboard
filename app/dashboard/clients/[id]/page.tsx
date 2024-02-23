import { getClientByID } from "@/actions/client/clientService";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BadgeX, History } from "lucide-react";
import SelectDate from '@/components/selectInstallDate';
import RemoveClientPopUp from "@/components/removeClientPopUp";
import UpdateClientForm from '@/components/EditClientForm';
import { getAllPlans } from "@/actions/plans/planService";

const ClientDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const cliente = await getClientByID(id);
  const plans = await getAllPlans()
  return (
    <Container>
      <section className="w-full flex items-center justify-between p-4">
        <h1 className="font-semibold lg:text-2xl text-xl text-zinc-950">
          Dados do Cliente
        </h1>
      </section>
      <ul className="lg:w-[70%] w-full shadow-md p-4 rounded-md [&>*]:p-2 [&>*]:flex [&>*]:gap-2">
        <li>
          <h2 className="font-semibold">Data da instalação:</h2>
          {cliente?.data_instalacao ? (
            cliente?.data_instalacao
          ) : (
            <Dialog>
              <DialogTrigger>Selecionar data</DialogTrigger>
              <SelectDate id={id} />
            </Dialog>
          )}
        </li>
        <li>
          <h2 className="font-semibold">Nome:</h2> {cliente?.nome}
        </li>
        <li>
          <h2 className="font-semibold">CPF/CNPJ:</h2> {cliente?.cpf_cnpj}
        </li>
        <li>
          <h2 className="font-semibold">RG/IE:</h2> {cliente?.rg_ie}
        </li>
        <li>
          <h2 className="font-semibold">Nascimento:</h2> {cliente?.nascimento}
        </li>
        <li>
          <h2 className="font-semibold">E-mail:</h2> {cliente?.email}
        </li>
        <li>
          <h2 className="font-semibold">Celular:</h2> {cliente?.telefone}
        </li>
        <li>
          <h2 className="font-semibold">Endereço:</h2> {cliente?.endereco}
        </li>
        <li>
          <h2 className="font-semibold">Plano:</h2> {cliente?.plan.name}
        </li>
        <li>
          <h2 className="font-semibold">Data de vencimento:</h2> Dia{" "}
          {cliente?.vencimento}
        </li>
        <li>
          <h2 className="font-semibold">Plano:</h2> {cliente?.instalacao}
        </li>
        <li>
          <h2 className="font-semibold">Como conheceu:</h2> {cliente?.pesquisa}
        </li>

        <li className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger>
              <Button className="border border-zinc-950 text-zinc-950 py-2 px-3 rounded-md shadow-md flex items-center lg:gap-2">
                <span className="mobile:hidden font-semibold">
                  Atualizar dados
                </span>
                <History size={20} color="#09090B" />
              </Button>
            </DialogTrigger>
            <UpdateClientForm client={cliente} plans={plans} />
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <Button className="flex items-center lg:gap-2 border border-red-500 text-red-500  py-2 px-3 rounded-md shadow-md">
                <span className="mobile:hidden font-semibold">
                  Deletar Cadastro
                </span>
                <BadgeX size={20} color="red" />
              </Button>
            </DialogTrigger>
            <RemoveClientPopUp id={cliente.id} />
          </Dialog>
        </li>
      </ul>
    </Container>
  );
};

export default ClientDetails;
