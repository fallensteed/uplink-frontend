import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { User } from "common/api/user/user.api";
import SpriteIcon from "common/components/SpriteIcon";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface UserFollowingProps {
    following?: User[] | null;
}

const UserFollowing: FC<UserFollowingProps> = (props: UserFollowingProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { following } = props;

    return (
        <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
            <Typography variant="h6">Following</Typography>
            <List dense>
                {following ? (
                    following.map((user) => (
                        <ListItem key={user._id}>
                            <ListItemButton
                                data-testid="link-to-user"
                                onClick={() => navigate(`../u/${user.uplinkUsername}`)}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: "white", height: 24, width: 24, ml: 1 }}>
                                        <SpriteIcon seed={`${user.uplinkUsername}`} size={16} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`u/${user.uplinkUsername}`} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText>This user is following no one.</ListItemText>
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default UserFollowing;
