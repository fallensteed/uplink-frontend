import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ClassificationBar from "common/classification/ClassificationBar";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "routes/Root";
import { Community, community_getAllByUserId } from "../routes/Uplink/api/community/community.api";
import MobileDrawer from "./components/MobileDrawer";
import UplinkNavButton from "./components/UplinkNavButton";
import UserDisplay from "./components/UserDisplay";
import { routeList } from "./pages";

const Navigation: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [communities, setCommunities] = useState<Community[] | null>(null);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const navigateTo = (path: string) => {
        handleDrawerClose();
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
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, display: { xs: "inline-flex", sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontFamily: "Space Mono", mr: theme.spacing(2) }}>
                        UPLINK
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1, alignItems: "center" }}>
                        <UplinkNavButton
                            communities={communities}
                            apps={routeList.filter((route) => route.displayInNavBar === true)}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <UserDisplay />
                    </Box>
                </Toolbar>
            </AppBar>
            <MobileDrawer
                communities={communities}
                apps={routeList.filter((route) => route.displayInNavBar === true)}
                handleDrawerClose={handleDrawerClose}
                drawerOpen={drawerOpen}
            />
        </>
    );
};

export default Navigation;
