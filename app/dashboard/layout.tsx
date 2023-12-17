import { ReactNode } from "react";
import Header from '../../components/ui/Header';

const DashboardLayout = ({children}:{children:ReactNode}) => {
    return ( 
        <body>
            <Header />
            {children}
        </body>
     );
}
 
export default DashboardLayout;