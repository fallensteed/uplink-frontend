import { Box, Button, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUser } from "common/context/User/UserContext";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpriteIcon from "../../common/components/SpriteIcon";
import Messages from "./Messages";
import Notifications from "./Notifications";

const UserDisplay = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useUser();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
                flexGrow: { xs: 1, sm: 0 },
            }}
        >
            <Messages count={0} />
            <Notifications count={0} />
            <Box sx={{ display: "flex", justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
                <Button
                    data-testid="user-settings-button"
                    onClick={handleClick}
                    sx={{ color: theme.palette.common.white, textTransform: "none" }}
                    endIcon={<SpriteIcon seed={`${user.profile.uplinkUsername}`} size={24} />}
                >
                    {user.profile.uplinkUsername}
                </Button>
            </Box>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <List dense>
                    <ListItem dense>
                        <ListItemButton
                            onClick={() => {
                                navigate("/a/my-user");
                                handleClose();
                            }}
                        >
                            <ListItemText primary="Profile and Settings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </Box>
    );
};

export default UserDisplay;
