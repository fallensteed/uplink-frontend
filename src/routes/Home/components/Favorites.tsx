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

export const mockFavoriteCommunities = ["c/SpOC", "c/STARCOM", "c/SpaceForceMemes", "c/AllMemes", "c/astronauts"];

export const mockFavoriteLinks = [
    "Space Force Portal",
    "Air Force Portal",
    "SpOC SharePoint",
    "TRACER",
    "sccInsider SharePoint",
];

const Favorites: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: theme.spacing(2) }}>
            <Typography variant="h4" sx={{ ml: 1, mt: 1 }}>
                Your Favorites
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <List dense sx={{ background: "none" }}>
                        {mockFavoriteCommunities.map((community) => (
                            <ListItem
                                key={community}
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
                                    <ListItemText primary={community} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid xs={6}>
                    <List dense sx={{ background: "none" }}>
                        {mockFavoriteLinks.map((link) => (
                            <ListItem
                                key={link}
                                divider
                                disablePadding
                                sx={{
                                    backgroundColor: theme.palette.backgroundLight.main,
                                    borderRadius: theme.spacing(0.75),
                                    mb: theme.spacing(0.75),
                                }}
                            >
                                <ListItemButton>
                                    <ListItemText primary={link} />
                                </ListItemButton>
                            </ListItem>
                        ))}
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
