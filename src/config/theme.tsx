import "@fontsource/noto-sans";
import "@fontsource/roboto";
import "@fontsource/space-mono";
import "@fontsource/spartan";
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
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    borderRadius: "4px 4px 0px 0px",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    "&.hover": {
                        backgroundColor: "#000",
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                },
            },
        },
    },
    typography: {
        h1: {
            fontWeight: 500,
            fontSize: "1.5rem",
            lineHeight: 1.2,
            letterSpacing: "0.0075em",
            fontFamily: "Space Mono",
        },
        h2: {
            fontWeight: 700,
            fontSize: "2rem",
            lineHeight: 1.25,
        },
        h3: {
            fontWeight: 400,
            fontSize: "2rem",
            lineHeight: 1.25,
        },
        h4: {
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.25,
        },
        h5: {
            fontWeight: 400,
            fontSize: "1.5rem",
            lineHeight: 1.25,
        },
        h6: {
            fontWeight: 700,
            fontSize: "1.25rem",
            lineHeight: 1.25,
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontStyle: "italic",
        },
        subtitle2: {
            fontSize: "1rem",
            fontStyle: "italic",
        },
        body1: {
            fontSize: "1rem",
        },
        body2: {
            fontSize: "0.825rem",
        },
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
