import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children:ReactNode
    button_cn?:string
}

const Button = ({children,button_cn,...rest}:ButtonProps) => {
    return ( 
        <button className={twMerge(button_cn,"p-3 font-semibold")} {...rest}>
            {children}
        </button>
     );
}
 
export default Button;