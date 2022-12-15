import { Box, Paper, Rating, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

const PulseSurvey: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: theme.spacing(2) }}>
            <Typography variant="h4" sx={{ ml: 1, mt: 1 }}>
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
                <Typography variant="body1" sx={{ m: theme.spacing(1) }}>
                    If you were offered a chance to work remotely full-time, would you take it?
                </Typography>
                <Rating name="pulse" defaultValue={0} size="large" />
                <Typography variant="body2">1 = Not at all, 5 = Absolutely</Typography>
            </Box>
        </Paper>
    );
};

export default PulseSurvey;
