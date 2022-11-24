import { Avatar, Typography } from "@mui/material";
import { useContext } from "react";
import SpriteIcon from "../../common/components/SpriteIcon";
import { UserContext } from "../../routes/Root";
import Messages from "./Messages";
import Notifications from "./Notifications";

const UserDisplay = () => {
    const user = useContext(UserContext);

    return (
        <>
            <Messages count={0} />
            <Notifications count={0} />
            <Typography variant="body1">{user?.uplinkUsername}</Typography>
            <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                <SpriteIcon seed={`${user?.uplinkUsername}`} size={24} />
            </Avatar>
        </>
    );
};

export default UserDisplay;
