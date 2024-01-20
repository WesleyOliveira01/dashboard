"use client";
import { IUserCard } from "@/interfaces/user-interfaces";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const RenderUsers = ({ users }: IUserCard) => {
  const router = useRouter();

  return (
    <section className=" w-full ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Permissão</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              onClick={() => router.push(`/dashboard/users/${user.id}`)}
              key={user.id}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isAdmin ? "administrador" : "Usuario padrao"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default RenderUsers;
