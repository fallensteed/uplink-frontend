import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PostPopulated } from "../api/post/post.api";
import FrontPagePost from "./FrontPagePost";

interface PostListProps {
    posts: PostPopulated[];
}

const PostList: FC<PostListProps> = (props: PostListProps) => {
    const { posts } = props;
    return (
        <Box>
            {posts.length ? (
                posts.map((post) => <FrontPagePost post={post} key={post._id} />)
            ) : (
                <Card>
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>Nothing to see here... Want to add a </Typography>
                        <Button component={Link} to="/submit/">
                            New Post?
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default PostList;
