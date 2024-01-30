import { getAllSearchs } from "@/actions/client/clientService";
import { getSales } from "@/actions/sales/salesService";
import Container from "@/components/ui/Container";
import { BadgeDollarSign, Car, Globe, StickyNote } from "lucide-react";
const Dashboard = async () => {
  const sales = await getSales()
  const search = await getAllSearchs()
  return (
    <Container className="gap-5">
      <section className="p-2 flex justify-evenly w-full gap-2">
        <div className="p-3 bg-zinc-950 text-zinc-50 rounded-md flex gap-2 w-[20%] font-semibold">
          <div className="flex flex-col items-center w-[50%]">
            <Car size={30} color="#fff" />
            <h1>Carro de som</h1>
          </div>
          <div className="flex justify-center items-center w-[50%] ">
            {search.carroDeSom}
          </div>
        </div>
        <div className="p-2 bg-zinc-950 text-zinc-50 rounded-md flex gap-2  w-[20%] font-semibold">
          <div className="flex flex-col items-center w-[50%] ">
            <StickyNote size={30} color="#fff" />
            <h1>Panfleto</h1>
          </div>
          <div className="flex justify-center items-center w-[50%] ">
            {search.panfleto}
          </div>
        </div>
        <div className="p-2 bg-zinc-950 text-zinc-50 rounded-md flex gap-2  w-[20%] font-semibold">
          <div className="flex flex-col items-center w-[50%]">
            <Globe size={30} color="#fff" />
            <h1>Google</h1>
          </div>
          <div className="flex justify-center items-center w-[50%] ">
            {search.google}
          </div>
        </div>
        <div className="p-2 bg-zinc-950 text-zinc-50 rounded-md flex gap-2  w-[20%] font-semibold">
          <div className="flex flex-col items-center w-[50%]">
            <StickyNote size={30} color="#fff" />
            <h1>Panfleto</h1>
          </div>
          <div className="flex justify-center items-center w-[50%] ">
            {search.panfleto}
          </div>
        </div>
        <div className="p-2 bg-zinc-950 text-zinc-50 rounded-md flex gap-2  w-[20%] font-semibold">
          <div className="flex flex-col items-center w-[50%]">
            <StickyNote size={30} color="#fff" />
            <h1>Indicação</h1>
          </div>
          <div className="flex justify-center items-center w-[50%] ">
            {search.indicacao}
          </div>
        </div>
        <div className="p-2 border border-zinc-950 text-zinc-950 rounded-md flex items-center gap-2  w-[10%] font-semibold">
          <div className="flex flex-col items-center w-[60%]">
            <BadgeDollarSign size={30} />
            <h1>Vendas no mês</h1>
          </div>
          <div className="flex flex-col items-center w-[40%]">{sales.month}</div>
        </div>
        <div className="p-2 border border-zinc-950 text-zinc-950 rounded-md flex items-center gap-2  w-[10%] font-semibold">
          <div className="flex flex-col items-center w-[60%]">
            <BadgeDollarSign size={30} />
            <h1>Vendas hoje</h1>
          </div>
          <div className="flex flex-col items-center w-[40%]">
            {sales.day}
          </div>
        </div>
      </section>
      <section className="bg-zinc-200 border-2 border-zinc-400 border-dashed rounded-md w-[70%] p-11">
        anything here
      </section>
    </Container>
  );
};

export default Dashboard;
