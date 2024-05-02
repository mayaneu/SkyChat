import { Container } from "@mui/material";
import ColumnContainer from "../../Layout/ColumnContainer";
import image from '../../assets/drone.png';
import IconsGroup from "./Components/IconsGroup";
import LogoutButton from "./Components/LogoutButton";

const Sidebar = () =>
    <ColumnContainer sx={{
        padding: '5px',
        alignItems: 'center',
        width: '100px',
        backgroundColor: 'background.paper',
        justifyContent: 'space-between',
        flexShrink: 0,
    }}>
        <Container sx={{ marginTop: '10px', gap: '2px' }}>
            <img
                src={image}
                loading="lazy"
                width='50px'
                height='50px'
            />
            <IconsGroup />
        </Container>
        <LogoutButton />
    </ColumnContainer>

export default Sidebar;