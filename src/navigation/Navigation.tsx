import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ClassificationBar from "common/classification/ClassificationBar";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "routes/Root";
import { Community, community_getAllByUserId } from "../routes/Uplink/api/community/community.api";
import UplinkNavButton from "./components/UplinkNavButton";
import UserDisplay from "./components/UserDisplay";
import { routeList } from "./pages";

const Navigation: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [communities, setCommunities] = useState<Community[] | null>(null);

    const openDrawer = () => {
        setDrawerOpen(true);
    };
    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const navigateTo = (path: string) => {
        closeDrawer();
        navigate(path);
    };

    const getCommunityList = async (userId: string) => {
        const response = await community_getAllByUserId(userId);
        if (response.data) setCommunities(response.data);
    };

    useEffect(() => {
        if (user) getCommunityList(user._id);
    }, [user]);

    return (
        <>
            <AppBar component="nav" color="appbar">
                <ClassificationBar />
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={openDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontFamily: "Space Mono", mr: theme.spacing(2) }}>
                        UPLINK
                    </Typography>
                    <UplinkNavButton communities={communities} />
                    <Box sx={{ flexGrow: 1 }} />
                    <UserDisplay />
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={closeDrawer}
                    ModalProps={{ keepMounted: true }}
                    sx={{ width: 240 }}
                >
                    <List>
                        {routeList
                            .filter((route) => route.displayInNavBar === true)
                            .map((route) => (
                                <ListItem key={route.shortName} disablePadding>
                                    <ListItemButton onClick={() => navigateTo(route.path)}>
                                        <ListItemIcon>{route.icon}</ListItemIcon>
                                        <ListItemText primary={route.shortName} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Drawer>
            </Box>
        </>
    );
};

export default Navigation;
