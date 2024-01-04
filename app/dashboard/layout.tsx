import { ReactNode } from "react";
import Header from '../../components/ui/Header';
import { Metadata } from "next";
import * as authService from "@/actions/auth/authservice";
import { Toaster } from "@/components/ui/toaster"
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
            <Toaster />
        </body>
     );
}
 
export default DashboardLayout;