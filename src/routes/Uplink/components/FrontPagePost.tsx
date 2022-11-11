import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

const FrontPagePost: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ display: "flex", flexDirection: "row", mb: theme.spacing(1) }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "54px",
                    minHeight: "115px",
                }}
            >
                <IconButton>
                    <KeyboardArrowUpIcon />
                </IconButton>
                <Typography>0</Typography>
                <IconButton>
                    <KeyboardArrowDownIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.backgroundLight.main,
                    minHeight: "100%",
                    borderRadius: "0 4px 4px 0",
                    p: theme.spacing(1),
                }}
            >
                <Typography>Post Title</Typography>
            </Box>
        </Paper>
    );
};

export default FrontPagePost;
