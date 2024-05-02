import { FC } from "react";
import { Typography } from "@mui/material";

import { Message as MessageType } from "../../../../../../../../types";
import RowContainer from "../../../../../../../../Layout/RowContainer";
import ColumnContainer from "../../../../../../../../Layout/ColumnContainer";
import Avatar from "../../../../../../../../Components/Avatar";

interface MessageProps {
    message: MessageType
}

const Message: FC<MessageProps> = ({ message: { author: { fullname }, date, text } }) => {

    return <RowContainer sx={{
        width: '100%',
        padding: '10px',
        gap: '10px',
        boxSizing: "border-box"
    }}>
        <Avatar name={fullname} />
        <ColumnContainer sx={{ width: '100%' }}>
            <RowContainer sx={{ width: '100%', gap: '10px' }}>
                <Typography sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                    {fullname}
                </Typography>
                <Typography sx={{ color: 'text.primary' }} fontSize={'small'}>
                    {new Date(date)?.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </Typography>
            </RowContainer>
            <Typography sx={{ color: 'text.primary' }} fontSize={'small'}>
                {text}
            </Typography>
        </ColumnContainer>

    </RowContainer >
}

export default Message;