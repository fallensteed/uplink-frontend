import { CardContent, CircularProgress, Typography } from "@mui/material";

const LoadingCard = () => {
    return (
        <CardContent
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography>Loading...</Typography>
            <CircularProgress />
        </CardContent>
    );
};

export default LoadingCard;
