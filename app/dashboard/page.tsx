import { getAllSearchs } from "@/actions/client/clientService";
import { getSales } from "@/actions/sales/salesService";
import Container from "@/components/ui/Container";
import { Car, Chrome, Coins, SmilePlus, Speech, StickyNote } from "lucide-react";
import SaleCard from "./../../components/saleCard";
const Dashboard = async () => {
  const sales = await getSales();
  const search = await getAllSearchs();
  return (
    <Container className="gap-5">
      <section className="p-2 flex justify-evenly w-full gap-2">
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
      <section className="p-3 flex justify-between w-full font-semibold">
        <h1>
          Painel de vendas
        </h1>
        <h1>
          Vendas Hoje: {sales.day}
        </h1>
      </section>
      <section className="bg-zinc-200 border-2 border-zinc-400 border-dashed rounded-md w-[70%] p-11">
        
        anything here
      </section>
    </Container>
  );
};

export default Dashboard;
