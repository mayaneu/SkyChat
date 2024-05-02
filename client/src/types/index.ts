export interface Chat {
    id: string
    participants: User[];
    lastMessage: Message
}

export interface Message {
    id: string,
    text: string,
    date: Date,
    author: User,
    chat: string
}

export interface User {
    id: string,
    fullname: string,
    isConnected: boolean
}