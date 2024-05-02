import { useQuery } from "@tanstack/react-query";

import { Chat, Message } from "../../../types";
import { axiosClient } from "../../../axiosClient";
import { useCurrentChat } from "../Providers/CurrentChatProvider";

export const useMessages = () => {
    const { currentChatId } = useCurrentChat();

    const getMessages = async () => {
        const reponse = await axiosClient.get(`/api/messages/${currentChatId}`);

        return reponse.data.messages;
    }

    const { data: messages, isLoading, refetch } = useQuery<Message[], Error>({
        queryKey: ['messages', currentChatId],
        queryFn: getMessages
    })


    return {  messages, isLoading, refetch }
}