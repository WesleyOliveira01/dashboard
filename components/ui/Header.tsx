import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar";

const Header = () => {
  return (
    <header className="bg-zinc-950 p-4 flex justify-between items-center">
      <h1 className="text-zinc-50 text-2xl font-semibold">Dashboard</h1>

      <Menubar className="bg-zinc-950 text-zinc-50 border-none">
        <MenubarMenu>
          <MenubarTrigger>Planos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Planos cadastrados</MenubarItem>
            <MenubarItem>Criar novo plano</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Cadastros de novos cliente</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Ver todos os cadastrados</MenubarItem>
            <MenubarItem>Novo cadastro</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Usuarios</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Ver todos os usuarios</MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/signUp">Cadastrar novo usuario</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/dashboard">Dashboard</Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </header>
  );
};

export default Header;
