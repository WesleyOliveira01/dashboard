import { getClientByID } from "@/actions/client/clientService";
import Container from "@/components/ui/Container";

const ClientPage = async ({ params }: { params: { id: string } }) => {
  const client = await getClientByID(params.id);
  return (
    <Container>
      <section>
        <ul>
            <li>
                Nome: {client.nome}
            </li>
            <li>
                CPF/CNPJ: {client.cpf_cnpj}
            </li>
        </ul>
      </section>
    </Container>
  );
};

export default ClientPage;
