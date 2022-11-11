import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";

const ReadingList: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
                CSO Reading List
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <List dense>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.common.white,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Guardian Ideal" sx={{ textAlign: "center" }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.common.white,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Guardian Ideal" sx={{ textAlign: "center" }} />
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
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.common.white,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Guardian Ideal" sx={{ textAlign: "center" }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            divider
                            disablePadding
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.common.white,
                                borderRadius: theme.spacing(0.75),
                                mb: theme.spacing(0.75),
                            }}
                        >
                            <ListItemButton>
                                <ListItemText primary="Guardian Ideal" sx={{ textAlign: "center" }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ReadingList;
