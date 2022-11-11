import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import SpaceForce36 from "../../../common/images/SpaceForce_36x36.png";

const Favorites: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
                Your Favorites
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <List dense>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemAvatar sx={{ minWidth: 36 }}>
                                    <Avatar src={SpaceForce36} sx={{ height: 24, width: 24 }} />
                                </ListItemAvatar>
                                <ListItemText primary="c/SpaceForce" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemAvatar sx={{ minWidth: 36 }}>
                                    <Avatar src={SpaceForce36} sx={{ height: 24, width: 24 }} />
                                </ListItemAvatar>
                                <ListItemText primary="c/SpaceForce" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemAvatar sx={{ minWidth: 36 }}>
                                    <Avatar src={SpaceForce36} sx={{ height: 24, width: 24 }} />
                                </ListItemAvatar>
                                <ListItemText primary="c/SpaceForce" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemAvatar sx={{ minWidth: 36 }}>
                                    <Avatar src={SpaceForce36} sx={{ height: 24, width: 24 }} />
                                </ListItemAvatar>
                                <ListItemText primary="c/SpaceForce" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemAvatar sx={{ minWidth: 36 }}>
                                    <Avatar src={SpaceForce36} sx={{ height: 24, width: 24 }} />
                                </ListItemAvatar>
                                <ListItemText primary="c/SpaceForce" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
                <Grid xs={6}>
                    <List dense>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Space Force Portal" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Space Force Portal" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Space Force Portal" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Space Force Portal" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.backgroundLight.main,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Space Force Portal" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button>View All / Manage</Button>
            </Box>
        </Paper>
    );
};

export default Favorites;
