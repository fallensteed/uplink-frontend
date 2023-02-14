import { Box, Typography, useTheme } from "@mui/material";
import moment from "moment";
import { FC } from "react";

interface FooterProps {
    connectionStatus: boolean;
}

const Footer: FC<FooterProps> = (props: FooterProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: { xs: "aboslute", md: "fixed" },
                bottom: 0,
                left: 0,
                width: "100%",
                height: { xs: "auto", md: 24 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.appbar.main,
                color: theme.palette.common.white,
            }}
        >
            <Typography variant="body2" sx={{ ml: theme.spacing(1) }}>
                Created by Supra Coders for the USSF &copy; {moment().format("YYYY")}
            </Typography>
            <Typography variant="body2">
                Live Services: {props.connectionStatus ? "Connected" : "Disconnected"}{" "}
            </Typography>
            <Typography variant="body2" sx={{ mr: theme.spacing(1) }}>
                Uplink v0.1.0
            </Typography>
        </Box>
    );
};

export default Footer;
