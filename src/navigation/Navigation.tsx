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
import ClassificationBar from "common/classification/ClassificationBar";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "routes/Root";
import UserDisplay from "./components/UserDisplay";
import { routeList } from "./pages";

const drawerWidth = 240;

const Navigation: FC = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    return (
        <>
            <AppBar component="nav" sx={{ backgroundColor: "#00263A"}}>
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Space Mono" }}>
                        UPLINK
                    </Typography>
                    <UserDisplay />
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer variant="temporary" open={drawerOpen} onClose={closeDrawer} ModalProps={{ keepMounted: true }}>
                    <List>
                        {routeList.map((route) => (
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
