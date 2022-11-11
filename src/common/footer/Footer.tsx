import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { FC } from "react";

interface FooterProps {
    connectionStatus: boolean;
}

const Footer: FC<FooterProps> = (props: FooterProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.appbar.main,
                color: theme.palette.common.white,
            }}
        >
            <Typography variant="body2">Created by Supra Coders for the USSF &copy; 2022</Typography>
            <Typography variant="body2">Status: {props.connectionStatus ? "Connected" : "Disconnected"} </Typography>
            <Typography variant="body2">UPLINK v0.0.1</Typography>
        </Box>
    );
};

export default Footer;
