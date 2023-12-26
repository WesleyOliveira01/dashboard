import { ReactNode } from "react";
import Header from '../../components/ui/Header';
import { Metadata } from "next";
import * as authService from "@/actions/auth/authservice";

export const metadata:Metadata = {
    title:"Sales dashboard",
    description:"panel to manage sales of mounth"
}

const DashboardLayout = async ({children}:{children:ReactNode}) => {
    const {getUserDetails} = authService
  const userDetails = await getUserDetails()
    return ( 
        <body>
            <Header userDetails={userDetails} />
            {children}
        </body>
     );
}
 
export default DashboardLayout;