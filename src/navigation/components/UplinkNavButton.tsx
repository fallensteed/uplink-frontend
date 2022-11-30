import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
    Avatar,
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    MenuList,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { NavList } from "navigation/pages";
import { FC, MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpriteIcon from "../../common/components/SpriteIcon";
import { Community } from "../../routes/Uplink/api/community/community.api";

interface UplinkNavButtonProps {
    communities: Community[] | null;
    following?: string[] | null;
    apps: NavList[];
}

const UplinkNavButton: FC<UplinkNavButtonProps> = (props: UplinkNavButtonProps) => {
    const { communities, following, apps } = props;
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const buttonDisplay = (pathname: string) => {
        if (pathname === "/home") {
            return (
                <>
                    <HomeIcon fontSize="small" sx={{ mr: theme.spacing(1) }} /> Home
                </>
            );
        } else if (pathname.includes("/c")) {
            return (
                <>
                    <Avatar
                        sx={{
                            height: 16,
                            width: 16,
                            mr: theme.spacing(1),
                            backgroundColor: theme.palette.common.white,
                        }}
                    >
                        <SpriteIcon seed={pathname.slice(3)} size={12} />
                    </Avatar>{" "}
                    {pathname.slice(1)}
                </>
            );
        } else if (pathname.includes("/u")) {
            return (
                <>
                    <Avatar
                        sx={{
                            height: 16,
                            width: 16,
                            mr: theme.spacing(1),
                            backgroundColor: theme.palette.common.white,
                        }}
                    >
                        <SpriteIcon seed={pathname.slice(3)} size={12} />
                    </Avatar>{" "}
                    {pathname.slice(1)}
                </>
            );
        } else if (pathname.includes("/a")) {
            const app = apps.filter((app) => app.path === pathname);
            return (
                <>
                    {app[0].icon ? (
                        <Avatar
                            sx={{
                                height: 16,
                                width: 16,
                                mr: theme.spacing(1),
                                backgroundColor: theme.palette.common.white,
                            }}
                        >
                            {app[0].icon}
                        </Avatar>
                    ) : null}
                    {app[0].name}
                </>
            );
        } else {
            return pathname.slice(1);
        }
    };

    return (
        <>
            <NavButton
                variant="outlined"
                sx={{
                    color: theme.palette.common.white,
                    minWidth: 200,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textTransform: "none",
                    pr: 5,
                }}
                endIcon={<KeyboardArrowDown />}
                onClick={handleOpenMenu}
            >
                {buttonDisplay(location.pathname)}
            </NavButton>
            <Menu id="navigation-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuList dense sx={{ minWidth: 200, maxHeight: 300, "& ul": { p: 0 } }} subheader={<li />}>
                    <MenuItem
                        onClick={() => {
                            navigate(`/home`);
                            handleCloseMenu();
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onClick={() => {
                            navigate(`/new-community`);
                            handleCloseMenu();
                        }}
                    >
                        <ListItemIcon>
                            <AddIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Create a Community</ListItemText>
                    </MenuItem>
                    <Divider />
                    <li>
                        <ul>
                            <ListSubheader sx={{ lineHeight: 2, background: theme.palette.common.white }}>
                                Your Communities
                            </ListSubheader>
                            {communities ? (
                                communities?.map((community) => (
                                    <MenuItem
                                        key={community._id}
                                        onClick={() => {
                                            navigate(`/c/${community.link}`);
                                            handleCloseMenu();
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                height: 16,
                                                width: 16,
                                                mr: theme.spacing(1),
                                                backgroundColor: theme.palette.common.white,
                                            }}
                                        >
                                            <SpriteIcon seed={community.link} size={12} />
                                        </Avatar>
                                        c/{community.link}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    <ListItemText>You haven&apos;t joined any communities yet!</ListItemText>
                                </MenuItem>
                            )}
                        </ul>
                    </li>
                    <Divider sx={{ ml: 1, mr: 1 }} />
                    <li style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}>
                        <ul>
                            <ListSubheader sx={{ lineHeight: 2, background: theme.palette.common.white }}>
                                Following
                            </ListSubheader>
                            {following ? (
                                following?.map((user) => (
                                    <MenuItem
                                        key={user}
                                        onClick={() => {
                                            navigate(`/c/${user}`);
                                            handleCloseMenu();
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                height: 16,
                                                width: 16,
                                                mr: theme.spacing(1),
                                                backgroundColor: theme.palette.common.white,
                                            }}
                                        >
                                            <SpriteIcon seed={user} size={12} />
                                        </Avatar>
                                        u/{user}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    <ListItemText>You haven&apos;t followed any users yet!</ListItemText>
                                </MenuItem>
                            )}
                        </ul>
                    </li>
                    <Divider sx={{ ml: 1, mr: 1 }} />
                    <li style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}>
                        <ul>
                            <ListSubheader sx={{ lineHeight: 2, background: theme.palette.common.white }}>
                                Apps
                            </ListSubheader>
                            {apps ? (
                                apps?.map((app) => (
                                    <MenuItem
                                        key={app.shortName}
                                        onClick={() => {
                                            navigate(app.path);
                                            handleCloseMenu();
                                        }}
                                    >
                                        <ListItemIcon>{app.icon}</ListItemIcon>
                                        {app.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    <ListItemText>You haven&apos;t followed any users yet!</ListItemText>
                                </MenuItem>
                            )}
                        </ul>
                    </li>
                </MenuList>
            </Menu>
        </>
    );
};

const NavButton = styled(Button)(() => ({
    "& .MuiButton-startIcon": {
        position: "absolute",
        left: 16,
    },
    "& .MuiButton-endIcon": {
        position: "absolute",
        right: 16,
    },
}));

export default UplinkNavButton;
