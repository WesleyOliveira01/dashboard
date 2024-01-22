"use client";
import { IRenderClients } from "@/interfaces/client-interfaces";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const RenderClient = ({ clients }: IRenderClients) => {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableHead>Nome</TableHead>
        <TableHead>Contato</TableHead>
        <TableHead>Endereço</TableHead>
        <TableHead>Plano</TableHead>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow
            className="cursor-pointer"
            key={client.id}
            onClick={() => router.push(`/dashboard/clients/${client.id}`)}
          >
            <TableCell>{client.nome}</TableCell>
            <TableCell>{client.telefone}</TableCell>
            <TableCell>{client.endereco}</TableCell>
            <TableCell>{client.plan.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RenderClient;
