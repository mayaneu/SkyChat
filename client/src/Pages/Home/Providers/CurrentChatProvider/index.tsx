import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

export interface NewChat{
    participantsIds: string[]
}

interface ChatContextType{
    currentChatId: string,
    setCurrentChatId: (newChatId: string) => void,
    newChat: NewChat | undefined
    setNewChat: (newChat: NewChat | undefined) => void
}

const CurrentChatContext = createContext<ChatContextType>({} as ChatContextType)

const CurrentChatProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentChatId, setCurrentChatId] = useState('');
    const [newChat, setNewChat] = useState<NewChat>();


    return (
        <CurrentChatContext.Provider value={{currentChatId, setCurrentChatId, newChat, setNewChat}}>
            {children}
        </CurrentChatContext.Provider>
    )
}

export default CurrentChatProvider;

export const useCurrentChat = () => useContext(CurrentChatContext)