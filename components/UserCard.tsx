import { IUserCard } from "@/interfaces/auth-interfaces";
import { BadgeX } from "lucide-react";
import Button from "./ui/Button";

const UserCard = ({ name, email, permission,id }: IUserCard) => {
  return (
    <li className="w-full">
      <section className="shadow-md p-2 rounded-md flex justify-evenly items-center gap-1">
        <ul className="flex justify-evenly gap-2 text-sm">
          <li>{name}</li>
          <li>{email}</li>
          <li>{permission ? "administrador" : "Usuario padrao"}</li>
        </ul>
        <Button>
          <BadgeX size={20} color="red" />
        </Button>
      </section>
    </li>
  );
};

export default UserCard;
