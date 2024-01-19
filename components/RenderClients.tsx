import { BadgeX } from "lucide-react";
import Button from "./ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { IRenderClients } from "@/interfaces/client-interfaces";

const RenderClient = ({clients}:IRenderClients) => {
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
          <TableRow key={client.id}>
            <TableCell>{client.nome}</TableCell>
            <TableCell>{client.telefone}</TableCell>
            <TableCell>{client.endereco}</TableCell>
            <TableCell>{client.plan.name}</TableCell>
            <TableCell>
              <Button>
                <BadgeX color="red" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RenderClient;
