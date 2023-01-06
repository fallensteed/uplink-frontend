import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { FC, ReactNode } from "react";
import { UserContext } from "routes/Root";
import { mockUser1 } from "../common/api/user/user.mock";
import theme from "../config/theme";

export const TestWrapper = (props: { children: ReactNode }) => {
    const { children } = props;

    return (
        <UserContext.Provider value={mockUser1}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </UserContext.Provider>
    );
};
