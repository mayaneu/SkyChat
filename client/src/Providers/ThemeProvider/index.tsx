import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";

import { muiTheme } from "./theme";

const ThemeProvider: FC<PropsWithChildren> = ({children}) => <MuiThemeProvider theme={muiTheme}>
    {children}
</MuiThemeProvider>

export default ThemeProvider;
