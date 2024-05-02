import { FC, forwardRef } from "react"
import { Avatar as MuiAvatar, SxProps, Badge } from "@mui/material"

import { stringAvatar } from "./avatarUtils"

interface AvatarProps {
    name: string,
    isConnected?: boolean
    sx?: SxProps,
    onClick?: () => void
}

const Avatar: FC<AvatarProps> = forwardRef<HTMLDivElement, AvatarProps>(({ name, sx, isConnected = false, onClick, ...props }, ref) => {
    return <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
        invisible={!isConnected}
        {...props}
        sx={{
            '& .MuiBadge-dot': {
                width: '15px', 
                height: '15px',
                borderRadius: '50%', 
                border: '2px solid white',
                backgroundColor: '#44b700',
            }
        }}
    >
        <MuiAvatar {...props} onClick={onClick} {...stringAvatar(name)} sx={{ color: 'text.primary', ...sx }} ref={ref} />
    </Badge>
})

export default Avatar;