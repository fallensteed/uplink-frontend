import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

interface MessageCardProps {
    message: string;
}

const MessageCard: FC<MessageCardProps> = (props: MessageCardProps) => {
    const { message } = props;
    return (
        <Card>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography>{message}</Typography>
            </CardContent>
        </Card>
    );
};

export default MessageCard;
