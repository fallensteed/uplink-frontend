import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "navigation/components/SpriteIcon";
import { FC } from "react";
import FrontPagePost from "./components/FrontPagePost";

const Uplink: FC = () => {
    const theme = useTheme();
    return (
        <Box>
            <Paper sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
                <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                    <SpriteIcon />
                </Avatar>
                <TextField
                    fullWidth
                    size="small"
                    id="add-new-post-field"
                    label="Add New Post"
                    variant="outlined"
                    sx={{ background: "#fff", m: theme.spacing(1), borderRadius: theme.spacing(0.5) }}
                />
            </Paper>
            <Paper sx={{ mb: theme.spacing(2) }}>
                <Button startIcon={<LightModeIcon />} sx={{ m: theme.spacing(1) }}>
                    Newest
                </Button>
                <Button startIcon={<AutoGraphIcon />} sx={{ m: theme.spacing(1) }}>
                    Top Rated
                </Button>
                <Button startIcon={<PushPinIcon />} sx={{ m: theme.spacing(1) }}>
                    Pinned
                </Button>
            </Paper>
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
            <FrontPagePost />
        </Box>
    );
};

export default Uplink;
