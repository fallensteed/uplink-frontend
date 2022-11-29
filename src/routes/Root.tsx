import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "config/theme";
import { createContext, FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { User, user_self } from "../common/api/user/user.api";
import { socket } from "../common/config/socket";
import Footer from "../common/footer/Footer";
import Navigation from "../navigation/Navigation";

export const UserContext = createContext<User | null>(null);

const Root: FC = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const selfRegistration = async () => {
        const response = await user_self();
        if (response.data) {
            setUser(response.data);
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
            <Box id="main" sx={{ minHeight: "100%", width: "100%", backgroundColor: theme.palette.background.default }}>
                <UserContext.Provider value={user}>
                    <Navigation />
                    <Box
                        sx={{
                            pt: "86px",
                            height: "calc(100% - 86px)",
                            width: "100%",
                            pb: theme.spacing(4),
                        }}
                    >
                        <Outlet />
                    </Box>
                </UserContext.Provider>
                <Footer connectionStatus={isConnected} />
            </Box>
        </ThemeProvider>
    );
};

export default Root;
