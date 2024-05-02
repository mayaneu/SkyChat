import React, { FC, PropsWithChildren } from "react";

import QueryClientProvider from "./QueryClientProvider";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import WsProvider from "../Pages/Home/Providers/wsProvider";

const Providers: FC<PropsWithChildren> = ({ children }) =>
    <QueryClientProvider>
        <ThemeProvider>
            <WsProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </WsProvider>
        </ThemeProvider>
    </QueryClientProvider>

export default Providers;