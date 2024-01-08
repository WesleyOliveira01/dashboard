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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

const Header = async ({ userDetails }: { userDetails: TokenPayload }) => {
  const { signOut } = authService;
  return (
    <header className="bg-zinc-950 p-4 flex justify-between items-center">
      <h1 className="text-zinc-50 lg:text-2xl text-xl font-semibold">
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
      {/*mobile menu*/}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon color="white" size={35} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex-row justify-between pt-5 items-center">
              
                <h1 className="font-semibold text-xl">
                  Olá {userDetails?.simpleName}
                </h1>
                <button
                  onClick={async () => await signOut()}
                  className="flex justify-between"
                >
                   <LogOut size={20} color="red" />
                </button>
              
            </SheetHeader>
            <Accordion type="single" collapsible>
              <AccordionItem value="Planos">
                <AccordionTrigger>Planos</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 [&>*]:font-semibold">
                    <li>
                      <Link href="/dashboard/plans">Planos cadastrados</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/plans/newPlan">
                        Criar novo plano
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Usuarios">
                <AccordionTrigger>Usuarios</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 [&>*]:font-semibold">
                    <li>
                      <Link href="/dashboard/users">Ver todos os usuarios</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/signUp">
                        Cadastrar novo usuario
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Cadastros">
                <AccordionTrigger>Cadastros de novos cliente</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 [&>*]:font-semibold">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
