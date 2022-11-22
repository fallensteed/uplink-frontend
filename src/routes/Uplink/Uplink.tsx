import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "navigation/components/SpriteIcon";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostPopulated, post_getAll } from "./api/post/post.api";
import PostList from "./components/PostList";

const Uplink: FC = () => {
    const theme = useTheme();

    const [posts, setPosts] = useState<PostPopulated[] | null>(null);

    const getPosts = async () => {
        const response = await post_getAll();
        if (response.data) setPosts(response.data);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Box>
            <Paper sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
                <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                    <SpriteIcon />
                </Avatar>
                <Button
                    fullWidth
                    id="add-new-post-field"
                    variant="outlined"
                    sx={{
                        background: "#fff",
                        m: theme.spacing(1),
                        borderRadius: theme.spacing(0.5),
                        justifyContent: "flex-start",
                        cursor: "text",
                        textTransform: "none",
                        transition: "none",
                        "&:hover": {
                            backgroundColor: "#fff",
                        },
                    }}
                    component={Link}
                    to="/submit"
                >
                    Add New Post
                </Button>
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
            {posts ? (
                <PostList posts={posts} />
            ) : (
                <Card>
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography>Loading...</Typography>
                        <CircularProgress />
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default Uplink;
