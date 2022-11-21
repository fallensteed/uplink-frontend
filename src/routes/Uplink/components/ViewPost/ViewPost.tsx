import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CardContent, CircularProgress, Container, Fab, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostPopulated, post_getByMiniLink } from "routes/Uplink/api/post/post.api";
import PostContainer from "./PostContainer";

const ViewPost: FC = () => {
    const { community, miniLink } = useParams();
    const theme = useTheme();

    const [post, setPost] = useState<PostPopulated | null>(null);

    const getPost = async (link: string) => {
        const response = await post_getByMiniLink(link);
        if (response.data) setPost(response.data);
    };

    useEffect(() => {
        if (miniLink) getPost(miniLink);
    }, [miniLink]);

    return post ? (
        <Container maxWidth="md" sx={{ mt: theme.spacing(2) }}>
            <Box sx={{ position: 'absolute'}}
            <Fab variant="extended" color="primary" aria-label="back">
                <ArrowBackIcon sx={{ mr: theme.spacing(1) }} />
                Back
            </Fab>
            <PostContainer post={post} />
        </Container>
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
    );
};

export default ViewPost;
