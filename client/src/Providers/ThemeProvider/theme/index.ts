import { createTheme, ThemeOptions } from "@mui/material";

const theme: ThemeOptions = {
    palette: {
        text: {
            primary: 'white',
            secondary: 'rgb(156,166,178)'
        },
        primary: {
            main: 'rgb(1,102,255)'
        },
        background: {
            default: 'rgb(20,29,38)',
            paper: 'rgb(27,35,46)'
        },
        divider: 'rgb(40,49,66)'
    }
}

export const muiTheme = createTheme(theme);
