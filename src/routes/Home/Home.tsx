import { Box, Container, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import Uplink from "routes/Uplink/Uplink";

const Home: FC = () => {
    const theme = useTheme();
    return (
        <Container maxWidth="lg" sx={{ height: "100%" }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid md={7} xs={12} sx={{ height: "100%" }}>
                    <Uplink />
                </Grid>
                <Grid md={5} xs={12} sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            height: "100%",
                        }}
                    >
                        <Paper sx={{ width: "100%", height: 200 }}>
                            <Typography variant="h5" sx={{ ml: 1 }}>
                                Top Communities
                            </Typography>
                        </Paper>
                        <Paper sx={{ width: "100%", height: 150 }}>
                            <Typography variant="h5" sx={{ ml: 1 }}>
                                CSO Reading List
                            </Typography>
                        </Paper>
                        <Paper sx={{ width: "100%", height: 150 }}>
                            <Typography variant="h5" sx={{ ml: 1 }}>
                                USSF Pulse
                            </Typography>
                        </Paper>
                        <Paper sx={{ width: "100%", height: 200 }}>
                            <Typography variant="h5" sx={{ ml: 1 }}>
                                Your Favorites
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
