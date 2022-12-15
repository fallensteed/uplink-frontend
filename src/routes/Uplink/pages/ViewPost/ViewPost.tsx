import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Box, Card, CardContent, CircularProgress, Container, Fab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Comment, comment_getAllByPost } from "routes/Uplink/api/comment/comment.api";
import { PostPopulated, post_getByMiniLink } from "routes/Uplink/api/post/post.api";
import backgroundImage from "../../../../common/images/background_1.png";
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

    const getPost = async () => {
        const response = await post_getByMiniLink(miniLink as string);
        if (response.data) setPost(response.data);
    };

    const getComments = async () => {
        const response = await comment_getAllByPost(post?._id as string);
        if (response.data) {
            setComments(response.data);
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
            getPost();
        }
    };

    useEffect(() => {
        if (miniLink) getPost();
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
        <Box
            sx={{
                width: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box component="img" src={backgroundImage} sx={{ height: 75, width: "100%", objectFit: "cover" }} />
            <Box
                sx={{
                    mr: theme.spacing(2),
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        height: 32,
                        width: 32,
                        m: theme.spacing(1),
                        backgroundColor: theme.palette.common.white,
                    }}
                >
                    <SpriteIcon seed={post.community.link} size={24} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{post.community.name}</Typography>
                    <Typography variant="subtitle2">c/{post.community.link}</Typography>
                </Box>
            </Box>
            <Box sx={{ position: "absolute", top: 141, left: theme.spacing(3) }}>
                <Fab variant="extended" color="primary" aria-label="back" onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ mr: theme.spacing(1) }} />
                    Back
                </Fab>
            </Box>
            <Container maxWidth="md" sx={{ mt: theme.spacing(2) }}>
                <PostContainer post={post} getPost={getPost} />
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
