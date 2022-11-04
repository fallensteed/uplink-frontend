import { RuxClassificationMarking } from "@astrouxds/react";
import { Box, Typography } from "@mui/material";
import ClassificationBar from "../common/classification/ClassificationBar";
import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../common/config/socket";
import Navigation from "../navigation/Navigation";
import Footer from '../common/footer/Footer';

const Root: FC = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <Box id="main" sx={{ height: "100%", width: "100%", backgroundColor: "#425563" }}>
            <ClassificationBar />
            <Navigation />
            <Box sx={{ height: 64 }} />
            <Outlet />
            <Footer connectionStatus={isConnected} />
        </Box>
    );
};

export default Root;
