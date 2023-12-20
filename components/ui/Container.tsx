import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Container = ({children,className}:{children:ReactNode,className?:string}) => {
    return ( 
        <main className={twMerge(className,"flex flex-col items-center justify-center p-2")}>
            {children}
        </main>
     );
}
 
export default Container;