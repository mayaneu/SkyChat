import { Box, Container, SxProps } from "@mui/material"
import { FC, PropsWithChildren, MouseEventHandler } from "react"

interface Props extends PropsWithChildren {
    sx?: SxProps
    onClick?: MouseEventHandler<any> | undefined;
}

const RowContainer: FC<Props> = ({ children, sx, onClick }) =>
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        ...sx
    }} onClick={onClick}>
        {children}
    </Box>

export default RowContainer;

