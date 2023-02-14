import { ThemeProvider } from "@mui/material/styles";
import { ProvideUser } from "common/context/User/UserContext";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import theme from "../config/theme";

export const TestWrapper = (props: { children: ReactNode }) => {
    const { children } = props;

    return (
        <ProvideUser>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </ProvideUser>
    );
};
