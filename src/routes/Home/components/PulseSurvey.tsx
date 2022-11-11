import { Box, Paper, Rating, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

const PulseSurvey: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: 3 }}>
            <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
                USSF Pulse
            </Typography>
            <Box
                sx={{
                    backgroundColor: theme.palette.backgroundLight.main,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: theme.spacing(1),
                    borderRadius: theme.spacing(1),
                }}
            >
                <Typography variant="h6" sx={{ mb: theme.spacing(1) }}>
                    Survey Text Goes here
                </Typography>
                <Rating name="pulse" defaultValue={0} size="large" />
            </Box>
        </Paper>
    );
};

export default PulseSurvey;
