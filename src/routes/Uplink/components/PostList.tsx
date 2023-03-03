import { Box } from "@mui/material";
import { FC } from "react";
import { PostPopulated } from "../api/post/post.api";
import FrontPagePost from "./FrontPagePost";

interface PostListProps {
    posts?: PostPopulated[];
    getPosts: (id: string) => Promise<void>;
}

const PostList: FC<PostListProps> = (props: PostListProps) => {
    const { posts, getPosts } = props;
    return (
        <Box>
            {posts && posts.length
                ? posts.map((post) => <FrontPagePost post={post} key={post._id} getPosts={getPosts} />)
                : null}
        </Box>
    );
};

export default PostList;
