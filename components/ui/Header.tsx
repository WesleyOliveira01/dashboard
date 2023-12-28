"use client";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar";

import * as authService from "@/actions/auth/authservice";
import { TokenPayload } from "@/interfaces/auth-interfaces";
import { LogOut, MenuIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

const Header = async ({ userDetails }: { userDetails: TokenPayload }) => {
  const { signOut } = authService;
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
        <MenubarMenu>
          <MenubarTrigger>Ola {userDetails.simpleName}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <button
                onClick={async () => await signOut()}
                className="flex w-full justify-between"
              >
                Sair <LogOut size={20} color="red" />
              </button>
            </MenubarItem>
            <MenubarItem>
              <Link href="/dashboard/signUp">Ver Perfil</Link>
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
