import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#004B87",
        },
        accent: {
            main: "#862633",
        },
        appbar: { main: "#00263A", contrastText: "#fff" },
        background: {
            default: "#425563",
            paper: "#98A4AE",
        },
        backgroundLight: { main: "#DBE2E9" },
    },
});

declare module "@mui/material/styles" {
    interface Palette {
        accent: Palette["primary"];
        appbar: Palette["primary"];
        backgroundLight: Palette["primary"];
    }
    interface PaletteOptions {
        accent?: PaletteOptions["primary"];
        appbar?: PaletteOptions["primary"];
        backgroundLight?: PaletteOptions["primary"];
    }
}

declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides {
        appbar: true;
    }
}

declare module "@mui/material/Box" {
    interface BoxPropsColorOverrides {
        appbar: true;
    }
}

declare module "@mui/material/Badge" {
    interface BadgePropsColorOverrides {
        accent: true;
    }
}

export default theme;
