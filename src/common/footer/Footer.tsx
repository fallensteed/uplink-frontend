import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface FooterProps {
    connectionStatus: boolean;
}

const Footer: FC<FooterProps> = (props: FooterProps) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 24,
                backgroundColor: "#00263A",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="body2">Created by Supra Coders for the USSF &copy; 2022</Typography>
            <Typography variant="body2">
                Status: {props.connectionStatus ? "Connected" : "Disconnected"}{" "}
            </Typography>
            <Typography variant="body2">UPLINK v0.0.1</Typography>
        </Box>
    );
};

export default Footer;
