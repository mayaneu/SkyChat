import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Button: FC<ButtonProps> = ({ children, onClick }) =>
    <Box
        onClick={onClick}
        sx={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
                backgroundColor: '#115293'
            },
            '&:active': {
                backgroundColor: '#0d3c61'
            }
        }}
    >
        {children}
    </Box>

    export default Button;