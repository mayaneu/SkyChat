import { FC, PropsWithChildren } from "react";

import RowContainer from '../../../Layout/RowContainer';
import Sidebar from "../../../Components/Sidebar";
import ColumnContainer from "../../../Layout/ColumnContainer";

const Page: FC<PropsWithChildren> = ({ children }) => {

    return <RowContainer sx={{ width: '100%', height: '100%', padding: 0, backgroundColor: 'background.paper' }}>
        <Sidebar />
        <ColumnContainer sx={{ 
            backgroundColor: 'background.default', 
            border: 'solid', 
            borderWidth: '1px',
            borderRadius: '10px', 
            borderColor: 'divider',
            height: '96%', 
            alignSelf: 'flex-end' ,
            flex:1,
            overflow: 'hidden'
         }}>
            {children}
        </ColumnContainer>
    </RowContainer>
}

export default Page;