import { FC } from "react"
import { IconButton } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../../../../Providers/AuthProvider";

const LogoutButton: FC = () => {
    const { logout } = useAuth()

    return <IconButton onClick={logout} sx={{ alignSelf: 'flex-end', color: 'white' }}>
        <LogoutIcon />
    </IconButton>
}

export default LogoutButton