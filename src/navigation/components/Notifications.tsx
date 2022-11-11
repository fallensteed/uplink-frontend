import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";

interface NotificationsProps {
    count: number;
}

const Notifications: FC<NotificationsProps> = (props: NotificationsProps) => {
    const { count } = props;
    return (
        <Tooltip title={count === 0 ? "No New Notifications" : `${count} New Notifications`}>
            <IconButton sx={{ mr: 1 }}>
                {count === 0 ? (
                    <NotificationsNoneIcon color="primary" />
                ) : (
                    <>
                        <Badge
                            variant="dot"
                            badgeContent={count}
                            max={9}
                            color="accent"
                            sx={{ textAlign: "left", position: "absolute", top: 8, right: 8 }}
                        />
                        <NotificationsIcon color="primary" />
                    </>
                )}
            </IconButton>
        </Tooltip>
    );
};

export default Notifications;
