import { FC } from "react";
import ColumnContainer from "../../../../Layout/ColumnContainer";
import { useCurrentChat } from "../../Providers/CurrentChatProvider";
import Messages from "./Components/Messages";
import SendMessage from "./Components/SendMessage";

const ChatScreen: FC = () => {
    const { currentChatId, newChat } = useCurrentChat();


    return currentChatId || newChat ?
        <ColumnContainer sx={{ width: '100%', height: '100%' }}>
            {
                newChat ? <ColumnContainer sx={{ flex: 1 }} /> : <Messages />}
            <SendMessage />
        </ColumnContainer> :
        <></>
}

export default ChatScreen;