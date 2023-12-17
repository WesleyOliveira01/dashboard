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
            <MenubarItem>Cadastrar novo usuario</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Dashboard</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </header>
  );
};

export default Header;
