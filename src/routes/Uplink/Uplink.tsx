import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSnack from "../../common/components/SnackBar/ProvideSnack";
import { UserContext } from "../Root";
import { PostPopulated, post_getAll } from "./api/post/post.api";
import PostList from "./components/PostList";

const Uplink: FC = () => {
    const theme = useTheme();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const snack = useSnack();

    const [posts, setPosts] = useState<PostPopulated[] | null>(null);

    const getPosts = async () => {
        const response = await post_getAll();
        if (response.data) {
            setPosts(response.data);
        } else {
            snack("error", "Error populating posts.");
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Box>
            <Paper sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
                <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                    <SpriteIcon seed={`${user?.uplinkUsername}`} size={24} />
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
                    onClick={() => navigate("/submit")}
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
                <PostList posts={posts} getPosts={getPosts} />
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
