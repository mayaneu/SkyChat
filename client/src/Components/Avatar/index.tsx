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
                width: '15px', // Make the dot larger
                height: '15px', // Make the dot larger
                borderRadius: '50%', // Ensure it stays circular
                border: '2px solid white', // Optional: add a white border to make it stand out against the avatar
                backgroundColor: '#44b700', // Optional: a specific green color
            }
        }}
    >
        <MuiAvatar {...props} onClick={onClick} {...stringAvatar(name)} sx={{ color: 'text.primary', ...sx }} ref={ref} />
    </Badge>
})

export default Avatar;