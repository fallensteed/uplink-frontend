import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import { useUser } from "../../context/User/UserContext";

const LoadingScreen: FC = () => {
    const user = useUser();

    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={user.isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingScreen;
