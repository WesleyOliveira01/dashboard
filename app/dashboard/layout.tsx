import { ReactNode } from "react";
import Header from '../../components/ui/Header';
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Sales dashboard",
    description:"panel to manage sales of mounth"
}

const DashboardLayout = ({children}:{children:ReactNode}) => {
    return ( 
        <body>
            <Header />
            {children}
        </body>
     );
}
 
export default DashboardLayout;