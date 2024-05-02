import React, { FC, PropsWithChildren } from 'react';
import { QueryClientProvider as TanstackQueryClientProvider, QueryClient } from '@tanstack/react-query';


const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = new QueryClient()

    return <TanstackQueryClientProvider client={queryClient}>
        {children}
    </TanstackQueryClientProvider>

}

export default QueryClientProvider;