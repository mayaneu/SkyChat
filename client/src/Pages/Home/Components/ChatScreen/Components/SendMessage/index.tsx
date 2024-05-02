import { FC, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "../../../../../../axiosClient";
import { NewChat, useCurrentChat } from "../../../../Providers/CurrentChatProvider";

const SendMessage: FC = () => {
    const [value, setValue] = useState('');
    const { currentChatId, newChat, setNewChat } = useCurrentChat();

    const postMessage = (text: string) => {
        let chat: any = currentChatId;

        if (newChat) {
            chat = {
                participants: newChat.participantsIds
            }
        }

        return axiosClient.post('/api/messages', { text, chat })
    }

    const { mutate, data: response } = useMutation({
        mutationFn: postMessage
    })

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };


    const handleSave = () => {
        mutate(value);
        setValue('');
    }

    return <TextField sx={{
        backgroundColor: 'background.paper',
        '&.Mui-focused fieldset': {
            borderColor: 'divider',
        },
    }}
        value={value}
        onChange={(e) => {
            setValue(e.target.value);
        }}
        id="outlined-basic"
        variant="outlined"
        onSubmit={handleSave}
        onKeyDown={handleKeyDown}
        InputProps={{
            endAdornment:
                <IconButton sx={{ cursor: 'pointer' }} onClick={handleSave
                }>
                    <SendIcon color="primary" />
                </IconButton>
        }} />
}

export default SendMessage;