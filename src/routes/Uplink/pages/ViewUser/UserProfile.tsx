import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { FC } from "react";

interface UserProfileProps {
    username: string;
    personalText?: string;
    birthday?: string;
}

const UserProfile: FC<UserProfileProps> = (props: UserProfileProps) => {
    const theme = useTheme();
    const { username, personalText, birthday } = props;

    return (
        <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Avatar
                    sx={{
                        height: 48,
                        width: 48,
                        m: theme.spacing(1),
                        backgroundColor: theme.palette.common.white,
                    }}
                >
                    <SpriteIcon seed={username} size={32} />
                </Avatar>
                <Typography variant="h6">u/{username}</Typography>
            </Box>
            {personalText ? <Typography variant="body1">{personalText}</Typography> : null}
            {birthday ? <Typography variant="body1">Birthday: {birthday}</Typography> : null}
            <Box
                sx={{
                    mt: theme.spacing(2),
                    display: "flex",
                    flexFlow: "row wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <Button variant="contained" color="secondary">
                    Follow
                </Button>
                <Button variant="contained" color="secondary" disabled>
                    Chat
                </Button>
            </Box>
        </Paper>
    );
};

export default UserProfile;
