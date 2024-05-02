import { FC } from "react";
import RowContainer from "../../Layout/RowContainer";
import Page from "../Components/Page";
import { Typography } from "@mui/material";
import Chats from "./Components/Chats";
import CurrentChatProvider from "./Providers/CurrentChatProvider";
import ChatScreen from "./Components/ChatScreen";
import ChatMessagesProvider from "./Providers/ChatMessagesProvider";
import ConnectedUsers from "./Components/ConnectedUsers";

const Home: FC = () => {
    return <CurrentChatProvider>
        <ChatMessagesProvider>
            <Page>
                <RowContainer sx={{
                    height: '50px',
                    borderBottom: 'solid',
                    borderColor: 'divider',
                    alignItems: 'center',
                    padding: '10px',
                    borderWidth: '1px',
                    gap: '30px'
                }}>
                    <Typography sx={{ color: 'text.primary' }}>
                        Messages
                    </Typography>
                    <ConnectedUsers />
                </RowContainer>
                <RowContainer sx={{ flex: 1, overflow: 'auto' }}>
                    <Chats />
                    <ChatScreen />
                </RowContainer>
            </Page>
        </ChatMessagesProvider>
    </CurrentChatProvider>
}

export default Home;