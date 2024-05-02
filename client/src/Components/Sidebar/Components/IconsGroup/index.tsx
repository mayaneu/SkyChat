import { FC } from "react";
import ChatIcon from '@mui/icons-material/Chat';
import FlightIcon from '@mui/icons-material/Flight';
import { IconButton, Divider } from "@mui/material";

import ColumnContainer from "../../../../Layout/ColumnContainer";
import { Link } from "react-router-dom";

const IconsGroup: FC = () =>
    <ColumnContainer>
        <Divider variant="fullWidth" sx={{ color: 'green', width: '40px', margin: '5px', height: '10px' }} />
        <Link to={'/'}>
            <IconButton>
                <ChatIcon sx={{ color: 'white' }} />
            </IconButton>
        </Link>
        <Link to={'/droneControl'}>
            <IconButton>
                <FlightIcon sx={{ color: 'white' }} />
            </IconButton>
        </Link>
    </ColumnContainer >

export default IconsGroup;