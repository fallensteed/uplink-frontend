import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Community } from "routes/Uplink/api/community/community.api";

interface UserMemberProps {
    member?: Community[] | null;
}

const UserMember: FC<UserMemberProps> = (props: UserMemberProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { member } = props;

    return (
        <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
            <Typography variant="h6">Member of</Typography>
            <List dense>
                {member ? (
                    member.map((community) => (
                        <ListItem key={community._id}>
                            <ListItemButton onClick={() => navigate(`../c/${community.link}`)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: "white", height: 24, width: 24, ml: 1 }}>
                                        <SpriteIcon seed={`${community.link}`} size={16} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`c/${community.link}`} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText>This user is not a member of any communities.</ListItemText>
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default UserMember;
