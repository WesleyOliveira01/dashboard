import { getAllSearchs, getClients } from "@/actions/client/clientService";
import { getSales } from "@/actions/sales/salesService";
import RenderClient from "@/components/RenderClients";
import Container from "@/components/ui/Container";
import {
  Car,
  Chrome,
  Coins,
  SmilePlus,
  Speech,
  StickyNote,
} from "lucide-react";
import SaleCard from "./../../components/saleCard";
import Loading from "./loading";

const Dashboard = async () => {
  const sales = await getSales();
  const search = await getAllSearchs();
  const clients = await getClients();
  return (
    <Container className="gap-5">
      <section className="p-3 flex justify-between w-full font-semibold">
        <h1>Painel de vendas</h1>
        <h1>Vendas Hoje: {sales.day}</h1>
      </section>
      <section className="lg:p-2 flex justify-evenly w-full flex-wrap gap-2">
        <SaleCard
          icon={<Car size={30} color="#fff" />}
          titulo="Carro de som"
          total={search.carroDeSom}
        />
        <SaleCard
          icon={<Chrome size={30} color="#fff" />}
          titulo="Google"
          total={search.google}
        />
        <SaleCard
          icon={<Speech size={30} color="#fff" />}
          titulo="Indicação"
          total={search.indicacao}
        />
        <SaleCard
          icon={<StickyNote size={30} color="#fff" />}
          titulo="Panfleto"
          total={search.panfleto}
        />
        <SaleCard
          icon={<SmilePlus size={30} color="#fff" />}
          titulo="Já é/foi cliente"
          total={search.jaFoiClient}
        />
        <SaleCard
          icon={<Coins size={30} color="#fff" />}
          titulo="Vendas no mês"
          total={sales.month}
        />
      </section>

      {clients.length === 0 ? <Loading /> : <RenderClient clients={clients} />}
    </Container>
  );
};

export default Dashboard;
