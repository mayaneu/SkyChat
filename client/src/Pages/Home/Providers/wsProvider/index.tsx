import { FC, PropsWithChildren, createContext, useContext } from "react";
import useWebSocket, {SendMessage} from "react-use-websocket";

interface WsProps {
    sendMessage: SendMessage,
    lastMessage: MessageEvent<any> | null
}

const wsContext = createContext<WsProps>({} as WsProps);

const WsProvider: FC<PropsWithChildren> = ({children}) => {

    const {
        sendMessage, 
        lastMessage
    } = useWebSocket("ws://localhost:8000/ws/", {
        shouldReconnect: () => true,
    });

    return <wsContext.Provider value={{sendMessage, lastMessage}}>
        {children}
    </wsContext.Provider>
}

export default WsProvider;

export const useWs = () => useContext(wsContext);


