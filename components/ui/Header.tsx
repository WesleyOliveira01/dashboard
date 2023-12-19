"use client";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-zinc-950 p-4 flex justify-between items-center">
      <h1 className="text-zinc-50 lg:text-2xl font-semibold">
        <Link href="/dashboard">Dashboard</Link>
      </h1>

      <Menubar className="mobile:hidden bg-zinc-950 text-zinc-50 border-none">
        <MenubarMenu>
          <MenubarTrigger>Planos</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/dashboard/plans">Planos cadastrados</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/plans/newPlan">Criar novo plano</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Cadastros de novos cliente</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/dashboard/clients">Ver todos os cadastrados</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/clients/newClient">Novo cadastro</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Usuarios</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/dashboard/users">Ver todos os usuarios</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/signUp">Cadastrar novo usuario</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Menubar className="lg:hidden bg-zinc-950 text-zinc-50 border-none ">
        <MenubarMenu>
          <MenubarTrigger>
            <MenuIcon color="white" size={35} />
          </MenubarTrigger>
          <MenubarContent className="p-4 bg-zinc-950 text-zinc-50 border-none gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold py-2">
                    Planos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-3 p-2">
                      <li>
                        <Link href="/dashboard/plans">Planos cadastrados</Link>
                      </li>
                      <li>
                        <Link href="/dashboard/plans/newPlan">
                          Criar novo plano
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold py-2">
                    Cadastros de novos cliente
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-3 p-2">
                      <li>
                        <Link href="/dashboard/clients">
                          Ver todos os cadastrados
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/clients/newClient">
                          Novo cadastro
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold py-2">
                    Usuarios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-3 p-2">
                      <li>
                        <Link href="/dashboard/users">
                          Ver todos os usuarios
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/signUp">
                          Cadastrar novo usuario
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
};

export default Header;
