import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Suspense } from "react";
import Loading from "@/app/dashboard/loading";
const Container = ({children,className}:{children:ReactNode,className?:string}) => {
    return ( 
        <Suspense fallback={<Loading />}>
        <main className={twMerge("flex flex-col items-center justify-center p-2",className)}>
            {children}
        </main>
        </Suspense>
     );
}
 
export default Container;