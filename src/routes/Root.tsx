import { Alert, Box, Snackbar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import LoadingScreen from "common/components/LoadingScreen/LoadingScreen";
import { ProvideUser } from "common/context/User/UserContext";
import theme from "config/theme";
import { SnackbarProvider } from "notistack";
import { FC, createContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { User, user_self } from "../common/api/user/user.api";
import { socket } from "../common/config/socket";
import { ProvideUplinkUser } from "../common/context/UplinkUser/UplinkUserContext";
import Footer from "../common/footer/Footer";
import Navigation from "../navigation/Navigation";

export const UserContext = createContext<User | null>(null);

const Root: FC = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();
    const location = useLocation();

    const selfRegistration = async () => {
        try {
            const response = await user_self();
            if (response.data) {
                setUser(response.data);
            } else {
                throw new Error("Erorr collecting user data");
            }
            setErrorMessage("");
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            setErrorMessage("Error collecting user data. Please refresh and try again.");
            return;
        }
    };

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

    useEffect(() => {
        selfRegistration();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Box
                    id="main"
                    sx={{ minHeight: "100%", width: "100%", backgroundColor: theme.palette.background.default }}
                >
                    <UserContext.Provider value={user}>
                        <ProvideUser>
                            <ProvideUplinkUser>
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
                            </ProvideUplinkUser>
                        </ProvideUser>
                    </UserContext.Provider>
                    <Footer connectionStatus={isConnected} />
                </Box>
                <Snackbar open={Boolean(errorMessage)} autoHideDuration={null}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default Root;
