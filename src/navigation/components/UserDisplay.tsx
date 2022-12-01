import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import SpriteIcon from "../../common/components/SpriteIcon";
import { UserContext } from "../../routes/Root";
import Messages from "./Messages";
import Notifications from "./Notifications";

const UserDisplay = () => {
    const user = useContext(UserContext);

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
                <Typography variant="body1">{user?.uplinkUsername}</Typography>
                <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                    <SpriteIcon seed={`${user?.uplinkUsername}`} size={24} />
                </Avatar>
            </Box>
        </Box>
    );
};

export default UserDisplay;
