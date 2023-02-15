import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { useUser } from "common/context/User/UserContext";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingCard from "../../common/components/Loading/LoadingCard";
import useSnack from "../../common/components/SnackBar/ProvideSnack";
import { PostPopulated, post_getAll } from "./api/post/post.api";
import { uplink_user_getSavedPosts } from "./api/user/uplinkUser.api";
import PostList from "./components/PostList";

const Uplink: FC = () => {
    const theme = useTheme();
    const user = useUser();
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

    const getSavedPosts = async () => {
        const response = await uplink_user_getSavedPosts(user.profile._id);
        if (response.data) {
            setPosts(response.data);
        } else {
            snack("error", "Error populating saved posts.");
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Box>
            <Paper sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
                <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                    <SpriteIcon seed={`${user.profile.uplinkUsername}`} size={24} />
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
                <Button startIcon={<LightModeIcon />} sx={{ m: theme.spacing(1) }} onClick={getPosts}>
                    Newest
                </Button>
                <Button disabled startIcon={<AutoGraphIcon />} sx={{ m: theme.spacing(1) }}>
                    Top Rated
                </Button>
                <Button disabled startIcon={<PushPinIcon />} sx={{ m: theme.spacing(1) }}>
                    Pinned
                </Button>
                <Button startIcon={<BookmarkIcon />} sx={{ m: theme.spacing(1) }} onClick={getSavedPosts}>
                    Saved
                </Button>
            </Paper>
            {posts ? <PostList posts={posts} getPosts={getPosts} /> : <LoadingCard />}
        </Box>
    );
};

export default Uplink;
