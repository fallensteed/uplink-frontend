import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, Paper, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "navigation/components/SpriteIcon";
import { FC, useState } from "react";
import { mockCommunityList } from "./api/community/community.mock";
import { Post } from "./api/post/post.api";
import { mockPost1, mockPost2, mockPost3, mockPost4 } from "./api/post/post.mock";
import FrontPagePost from "./components/FrontPagePost";

const mockPosts = [mockPost1, mockPost2, mockPost3, mockPost4];

const Uplink: FC = () => {
    const theme = useTheme();
    const [posts, setPosts] = useState<Post[]>(mockPosts);
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
            {posts.map((post) => (
                <FrontPagePost post={post} key={post._id} />
            ))}
        </Box>
    );
};

export default Uplink;
