import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Card, CardContent, CircularProgress, Container, Fab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Comment, comment_getAllByPost } from "routes/Uplink/api/comment/comment.api";
import { PostPopulated, post_getByMiniLink } from "routes/Uplink/api/post/post.api";
import { UserContext } from "./../../../Root";
import { comment_postOne } from "./../../api/comment/comment.api";
import AddComment from "./AddComment";
import CommentContainer from "./CommentContainer";
import PostContainer from "./PostContainer";

const ViewPost: FC = () => {
    const { miniLink } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const user = useContext(UserContext);

    const [post, setPost] = useState<PostPopulated | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentCount, setCommentCount] = useState<number>(0);

    const getPost = async (link: string) => {
        const response = await post_getByMiniLink(link);
        if (response.data) setPost(response.data);
        if (response.commentCount) setCommentCount(response.commentCount);
    };

    const getComments = async () => {
        const response = await comment_getAllByPost(post?._id as string);
        if (response.data) {
            setComments(response.data);
            setCommentCount(response.data.length);
        }
    };

    const handleAddComment = async (text: string, commentOn?: string) => {
        const newComment: Comment = {} as Comment;
        newComment["text"] = text;
        if (commentOn) newComment["commentOn"] = commentOn;
        newComment["post"] = post?._id as string;
        newComment["user"] = user?._id as string;
        const response = await comment_postOne(newComment);
        if (response.data && response.data._id) {
            getPost(miniLink as string);
        }
    };

    useEffect(() => {
        if (miniLink) getPost(miniLink);
    }, [miniLink]);

    useEffect(() => {
        if (post && post._id) getComments();
    }, [post]);

    useEffect(() => {
        if (location.hash === "#comments") {
            const element = document.getElementById("comments");
            element?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location, post, comments]);

    return post ? (
        <Box sx={{ minHeight: "calc(100% - 16px)", width: "100%", position: "relative", pt: theme.spacing(2) }}>
            <Box sx={{ position: "absolute", top: theme.spacing(3), left: theme.spacing(3) }}>
                <Fab variant="extended" color="primary" aria-label="back" onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ mr: theme.spacing(1) }} />
                    Back
                </Fab>
            </Box>
            <Container maxWidth="md">
                <PostContainer post={post} commentCount={commentCount} />
                <AddComment handleAddComment={handleAddComment} />
                <CommentContainer comments={comments} getComments={getComments} />
            </Container>
        </Box>
    ) : (
        <Container maxWidth="md" sx={{ mt: theme.spacing(2) }}>
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
        </Container>
    );
};

export default ViewPost;
