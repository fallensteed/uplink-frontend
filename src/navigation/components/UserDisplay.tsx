import { Avatar, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../routes/Root";
import Messages from "./Messages";
import Notifications from "./Notifications";
import SpriteIcon from "./SpriteIcon";

const UserDisplay = () => {
    const user = useContext(UserContext);

    return (
        <>
            <Messages count={0} />
            <Notifications count={0} />
            <Typography variant="body1">{user?.uplinkUsername}</Typography>
            <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                <SpriteIcon />
            </Avatar>
        </>
    );
};

export default UserDisplay;
