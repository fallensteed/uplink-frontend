import { Box, Container, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import Uplink from "routes/Uplink/Uplink";
import ReadingList from "./components/ReadingList";
import TopCommunities from "./components/TopCommunities";
import PulseSurvey from './components/PulseSurvey';
import Favorites from './components/Favorites';

const Home: FC = () => {
    const theme = useTheme();
    return (
        <Container maxWidth="lg" sx={{ mt: 4, height: "calc(100% - 32px)" }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
                <Grid md={7} xs={12} sx={{ height: "100%" }}>
                    <Uplink />
                </Grid>
                <Grid md={5} xs={12} sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <TopCommunities />
                        <ReadingList />
                        <PulseSurvey />
                        <Favorites />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
