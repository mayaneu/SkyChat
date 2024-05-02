import { FC } from "react";
import ColumnContainer from "../../../../../../Layout/ColumnContainer";
import { useCurrentChat } from "../../../../Providers/CurrentChatProvider";
import { axiosClient } from "../../../../../../axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Message as MessageType } from "../../../../../../types";
import Message from "./Components/Message";

const Messages: FC = () => {
    const { currentChatId } = useCurrentChat();

    const getMessages = async () => {
        const reponse = await axiosClient.get(`/api/messages/${currentChatId}`);

        return reponse.data.messages;
    }

    const { data: messages, isLoading } = useQuery({ queryKey: ['messages', currentChatId], queryFn: getMessages })

    return !isLoading && messages &&
        <ColumnContainer sx={{ width: '100%', flex: '1', flexDirection: 'column-reverse', overflow: 'auto' }}>
            {(messages as MessageType[]).map((message) => {
                return <Message key={message.id} message={message} />
            })}
        </ColumnContainer>

}

export default Messages;