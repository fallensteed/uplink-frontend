/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import kenobi from "./Kenobi.gif";

const ErrorPage: FC = () => {
    const navigate = useNavigate();
    const error = useRouteError() as any;
    console.error(error);

    return (
        <>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#425563",
                    color: "white",
                }}
            >
                <Typography variant="h2">Oops!</Typography>
                <Box component="img" src={kenobi} sx={{ p: 3 }} />
                <Typography variant="body1" sx={{ pb: 2 }}>
                    Sorry, an unexpected error has occurred.
                </Typography>
                <Typography sx={{ pb: 2 }} variant="subtitle1">
                    {error ? error.statusText || error.message : null}
                </Typography>
                <Button startIcon={<ArrowBackIcon />} color="inherit" onClick={() => navigate(-1)}>
                    Try Going Back
                </Button>
            </Box>
        </>
    );
};

export default ErrorPage;
