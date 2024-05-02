import { FC } from "react";
import { Typography, Badge } from "@mui/material";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";

import RowContainer from "../../../../../Layout/RowContainer";
import { Chat } from '../../../../../types'
import ColumnContainer from "../../../../../Layout/ColumnContainer";
import { useCurrentChat } from "../../../Providers/CurrentChatProvider";
import Avatar from "../../../../../Components/Avatar";
import { useAuth } from "../../../../../Providers/AuthProvider";

dayjs.extend(relativeTime);

interface ChatProps {
    chat: Chat
}

const SingleChat: FC<ChatProps> = ({ chat: { id, participants, lastMessage: { text, date } } }) => {
    const { setCurrentChatId } = useCurrentChat();
    const { user } = useAuth();

    const getOtherParticipant = () =>
        participants.find(({ id }) => id !== user?.id);

    const otherParticipant = getOtherParticipant();
    const isConnected = otherParticipant?.isConnected;

    const chooseChat = () => {        
        setCurrentChatId(id)
    }

    return (
        <RowContainer sx={{
            width: "100%",
            padding: '8px',
            boxSizing: "border-box",
            marginTop: '5px',
            borderRadius: '10px',
            cursor: 'pointer',
            gap: '10px',
            '&:hover': {
                backgroundColor: 'background.paper'
            }
        }} onClick={chooseChat}>
            <Avatar name={otherParticipant?.fullname || ''} isConnected={isConnected} />
            <ColumnContainer sx={{ width: '100%' }}>
                <RowContainer sx={{ width: '100%', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.primary' }}>
                        {otherParticipant?.fullname || ''}
                    </Typography>
                    <Typography sx={{ color: 'text.primary' }} fontSize={'small'}>
                        {dayjs().to(dayjs(date))}
                    </Typography>
                </RowContainer>
                <Typography sx={{ color: 'text.primary' }} fontSize={'small'}>
                    {text}
                </Typography>
            </ColumnContainer>
        </RowContainer>
    );
}

export default SingleChat;