import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type SaleCardProps = {
    icon:ReactElement
    titulo:string
    total:number
    className?:string
}

const SaleCard = ({icon,titulo,total,className}:SaleCardProps) => {
  return (
    <section className="shadow-md flex gap-1 rounded-md w-[30%]">
      <div className={twMerge("p-2 rounded-l-md bg-green-500 w-[40%] flex items-center justify-center",className)}>
        {icon}
      </div>
      <div className="p-2 flex flex-col items-center w-[60%] font-semibold">
        <h1>{titulo}</h1>
        <h2>{total}</h2>
        <p>Vendas</p>
      </div>
    </section>
  );
};

export default SaleCard;
