import { FC } from "react";
import RowContainer from "../../../../Layout/RowContainer";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../../types";
import { axiosClient } from "../../../../axiosClient";
import Avatar from "../../../../Components/Avatar";
import { Tooltip } from "@mui/material";
import { useAuth } from "../../../../Providers/AuthProvider";
import { useCurrentChat } from "../../Providers/CurrentChatProvider";
import { useChats } from "../../hooks/use-chats";

const getConnectedUsers = async (): Promise<{ users: User[] }> => {
    const { data } = await axiosClient.get('/api/users/connected')

    return data;
}

const ConnectedUsers: FC = () => {
    const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: getConnectedUsers })

    const { user: connectedUser } = useAuth();
    const { setCurrentChatId, setNewChat } = useCurrentChat();
    const { chats } = useChats();
    const users = data?.users?.filter(({ id }) => id !== connectedUser?.id);

    const openChat = (user_id: string) => {
        const existingChat = chats?.find(({ participants }) => !!participants.filter(({ id }) => id === user_id).length);
        if (existingChat) {
            setCurrentChatId(existingChat.id);
        } else {
            setNewChat({ participantsIds: [user_id] });
        }
    }

    return !isLoading ? <RowContainer sx={{ flex: 1, gap: '20px' }}>
        {users && users?.map((user) =>
            <Tooltip key={user.id} title={user.fullname}>
                <Avatar sx={{ cursor: 'pointer' }} onClick={() => openChat(user.id)} key={user.id} name={user.fullname} isConnected={user.isConnected} />
            </Tooltip>
        )}
    </RowContainer> : <></>
}

export default ConnectedUsers;