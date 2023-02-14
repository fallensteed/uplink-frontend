import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LoadingScreen from "common/components/LoadingScreen/LoadingScreen";
import { ProvideUser } from "common/context/User/UserContext";
import theme from "config/theme";
import { SnackbarProvider } from "notistack";
import { FC, createContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { User } from "../common/api/user/user.api";
import { socket } from "../common/config/socket";
import Footer from "../common/footer/Footer";
import Navigation from "../navigation/Navigation";

export const UserContext = createContext<User | null>(null);

const Root: FC = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") navigate("/home");
    }, [location]);

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
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Box
                    id="main"
                    sx={{ minHeight: "100%", width: "100%", backgroundColor: theme.palette.background.default }}
                >
                    <ProvideUser>
                        <Navigation />
                        <Box
                            sx={{
                                pt: { xs: "78px", md: "86px" },
                                height: { xs: "calc(100% - 78px)", md: "calc(100% - 86px)" },
                                width: "100%",
                                pb: theme.spacing(4),
                            }}
                        >
                            <Outlet />
                        </Box>
                        <LoadingScreen />
                    </ProvideUser>
                    <Footer connectionStatus={isConnected} />
                </Box>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default Root;
