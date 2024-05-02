import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useQueryClient } from "@tanstack/react-query";
import { Chat, Message } from "../../../../types";
import { useWs } from "../wsProvider";
import { useChats } from "../../hooks/use-chats";
import { useCurrentChat } from "../CurrentChatProvider";
import { useMessages } from "../../hooks/use-messages";

interface ChatMessagesContextType {
    canSendMessages: boolean,
    sendMessage: (content: string) => void
}

const ChatMessagesContext = createContext<ChatMessagesContextType>({} as ChatMessagesContextType);

const SOCKET_URL = "ws://localhost:8000/ws/"
    ;
const MESSAGE_TYPE = 'NEW_MESSAGE'
export const queryKey = ["messages"];
export const queryKey2 = ['chats'];

const ChatMessagesProvider: FC<PropsWithChildren> = ({ children }) => {
    const {
        sendMessage: sendSocket,
        lastMessage,
    } = useWs()

    const readyState = ReadyState.OPEN;

    const queryClient = useQueryClient();
    const { newChat, setNewChat, setCurrentChatId, currentChatId } = useCurrentChat();
    const { refetch: refetchChats } = useChats();
    const canSendMessages = readyState === ReadyState.OPEN;

    useEffect(() => {
        const async = async () => {
            if (lastMessage && lastMessage.data) {
                const message: Message = JSON.parse(lastMessage.data);
                queryClient.setQueryData(['messages', currentChatId], (oldData: any) => {
                    return oldData ? [message, ...oldData] : [message]
                });

                await refetchChats();
                if (newChat) {
                    setNewChat(undefined);
                    setCurrentChatId(message.chat);
                }
            }
        }

        async();
    }, [lastMessage, queryClient]);

    const sendMessage = useCallback(
        (messgaeId: any) => {
            if (canSendMessages)
                sendSocket(messgaeId);
        },
        [canSendMessages, sendSocket],
    );

    return (
        <ChatMessagesContext.Provider value={{ canSendMessages, sendMessage }}>
            {children}
        </ChatMessagesContext.Provider>
    );
};

export default ChatMessagesProvider;

export const useChatMessagesContext = () => useContext(ChatMessagesContext);