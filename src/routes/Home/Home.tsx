import { Backdrop, Box, CircularProgress, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import Uplink from "routes/Uplink/Uplink";
import { useUser } from "../../common/context/User/UserContext";
import Favorites from "./components/Favorites";
import PulseSurvey from "./components/PulseSurvey";
import ReadingList from "./components/ReadingList";
import TopCommunities from "./components/TopCommunities";

const Home: FC = () => {
    const theme = useTheme();
    const user = useUser();

    return !user.isLoading ? (
        <Container
            maxWidth="lg"
            sx={{ mt: { xs: theme.spacing(1), md: theme.spacing(4) }, height: { xs: "auto", md: "calc(100% - 32px)" } }}
        >
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
    ) : (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Home;
