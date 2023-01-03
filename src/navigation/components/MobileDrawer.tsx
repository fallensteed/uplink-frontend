import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import {
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import SpriteIcon from "common/components/SpriteIcon";
import { NavList } from "navigation/pages";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Community } from "routes/Uplink/api/community/community.api";
import UserDisplay from "./UserDisplay";

interface MobileDrawerProps {
    communities: Community[] | null;
    following?: string[] | null;
    apps: NavList[];
    drawerOpen: boolean;
    handleDrawerClose: () => void;
}

const MobileDrawer: FC<MobileDrawerProps> = (props: MobileDrawerProps) => {
    const { drawerOpen, handleDrawerClose, communities, following, apps } = props;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box component="nav">
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: "80%" },
                }}
            >
                <Box onClick={handleDrawerClose}>
                    <Box sx={{ width: "100%", my: theme.spacing(1), display: "flex", justifyContent: "flex-end" }}>
                        <Button sx={{ mr: theme.spacing(2) }}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemButton
                                onClick={() => {
                                    navigate(`/home`);
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Home</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <UserDisplay />
                        </ListItem>
                        <Divider />
                        <ListSubheader
                            sx={{ lineHeight: 2, background: theme.palette.common.white, mt: theme.spacing(0.5) }}
                        >
                            Your Communities
                        </ListSubheader>
                        {communities ? (
                            communities?.map((community) => (
                                <ListItem key={community._id} disablePadding dense>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(`/c/${community.link}`);
                                            handleDrawerClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SpriteIcon seed={community.link} size={16} />
                                        </ListItemIcon>
                                        <ListItemText>c/{community.link}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem dense disablePadding>
                                <ListItemButton disabled>
                                    <ListItemText>You haven&apos;t joined any communities yet!</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )}
                        <Divider />
                        <ListSubheader
                            sx={{ lineHeight: 2, background: theme.palette.common.white, mt: theme.spacing(0.5) }}
                        >
                            Following
                        </ListSubheader>
                        {following ? (
                            following?.map((user) => (
                                <ListItem key={user} disablePadding dense>
                                    <ListItemButton
                                        onClick={() => {
                                            navigate(`/u/${user}`);
                                            handleDrawerClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SpriteIcon seed={user} size={16} />
                                        </ListItemIcon>
                                        <ListItemText>u/{user}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem dense disablePadding>
                                <ListItemButton disabled>
                                    <ListItemText>You haven&apos;t followed any users yet!</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )}
                        <Divider />
                        <ListSubheader
                            sx={{ lineHeight: 2, background: theme.palette.common.white, mt: theme.spacing(0.5) }}
                        >
                            Apps
                        </ListSubheader>
                        {apps ? (
                            apps
                                ?.filter((route) => route.displayInNavBar === true)
                                .map((app) => (
                                    <ListItem key={app.shortName} disablePadding dense>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(app.path);
                                                handleDrawerClose();
                                            }}
                                        >
                                            <ListItemIcon>{app.icon}</ListItemIcon>
                                            <ListItemText>{app.name}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                        ) : (
                            <ListItem dense disablePadding>
                                <ListItemButton disabled>
                                    <ListItemText>You haven&apos;t joined any communities yet!</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MobileDrawer;
