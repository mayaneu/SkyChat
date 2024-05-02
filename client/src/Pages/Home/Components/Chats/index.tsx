import { FC } from "react";
import ColumnContainer from "../../../../Layout/ColumnContainer";
import { useQuery } from "@tanstack/react-query";
import SingleChat from "./SingleChat";
import { Chat } from "../../../../types";
import { axiosClient } from "../../../../axiosClient";
import { useChats } from "../../hooks/use-chats";


const Chats: FC = () => {
    const { chats, isLoading } = useChats()

    return (<ColumnContainer sx={{
        width: '30%',
        borderRight: 'solid',
        borderWidth: '1px',
        borderColor: 'divider',
        padding: '10px'
    }}>
        {!isLoading && (chats as unknown as Chat[])?.map((chat: Chat) =>
            <SingleChat key={chat.id} chat={chat} />)}
    </ColumnContainer>)
}

export default Chats;