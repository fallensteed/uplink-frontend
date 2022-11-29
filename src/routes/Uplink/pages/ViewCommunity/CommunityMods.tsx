import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../common/api/user/user.api";
import SpriteIcon from "../../../../common/components/SpriteIcon";

interface CommunityModsProps {
    mods: User[];
}

const CommunityMods: FC<CommunityModsProps> = (props: CommunityModsProps) => {
    const { mods } = props;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
            <Typography variant="h6">Community Mods</Typography>
            <List dense>
                {mods.map((mod) => (
                    <ListItem key={mod._id}>
                        <ListItemButton onClick={() => navigate(`../u/${mod.uplinkUsername}`)}>
                            <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "white", height: 24, width: 24, ml: 1 }}>
                                    <SpriteIcon seed={`${mod.uplinkUsername}`} size={16} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`u/${mod.uplinkUsername}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default CommunityMods;
