import { getClients } from "@/actions/client/clientService";
import RenderClient from "@/components/RenderClients";
import Container from "@/components/ui/Container";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import Loading from "../loading";

const Clients = async () => {
  const clients = await getClients();
  return (
    <Container>
      <section className="p-3 font-semibold flex justify-between w-full">
        <h1 className="text-xl">Clientes Recém cadastrados</h1>

        <Link href="/dashboard/clients/newClient" className="flex gap-2">
          <span className="mobile:hidden">Cadastrar novo cliente</span>{" "}
          <BadgePlus color="green" />
        </Link>
      </section>
      {clients.length === 0 ? <Loading /> : <RenderClient clients={clients} />}
    </Container>
  );
};

export default Clients;
