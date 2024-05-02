import { Box, SxProps } from "@mui/material"
import { FC, PropsWithChildren } from "react"

interface Props extends PropsWithChildren{
    sx?: SxProps
}

const ColumnContainer: FC<Props> = ({ children,sx }) =>
    <Box sx={{
        display: 'flex',
        flexDirection: 'column' ,
        ...sx
    }}>
        {children}
    </Box>

export default ColumnContainer;

