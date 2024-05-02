import { useQuery } from "@tanstack/react-query";

import { Chat } from "../../../types";
import { axiosClient } from "../../../axiosClient";

const getChats = async () => {
    const response = await axiosClient.get('/api/chats')

    return response.data.chats
}

export const useChats = () => {
    const { data: chats, isLoading, refetch } = useQuery<Chat[], Error>({ queryKey: ['chats'], queryFn: getChats })


    return { chats, isLoading, refetch }
}