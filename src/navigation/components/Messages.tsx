import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Badge, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";

interface MessagesProps {
    count: number;
}

const Messages: FC<MessagesProps> = (props: MessagesProps) => {
    const { count } = props;
    return (
        <Tooltip title={count === 0 ? "No New Messages" : `${count} New Messages`}>
            <IconButton sx={{ mr: 1 }}>
                {count === 0 ? (
                    <ChatBubbleOutlineIcon color="primary" />
                ) : (
                    <>
                        <Badge
                            variant="dot"
                            badgeContent={count}
                            max={9}
                            color="error"
                            sx={{ textAlign: "left", position: "absolute", top: 8, right: 6 }}
                        />
                        <ChatBubbleIcon color="primary" />
                    </>
                )}
            </IconButton>
        </Tooltip>
    );
};

export default Messages;
