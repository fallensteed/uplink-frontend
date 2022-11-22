import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import { Comment, comment_getAllByPost } from "./../../api/comment/comment.api";
import CommentSection from "./CommentSection";

interface CommentContainerProps {
    postId: string;
}

const CommentContainer: FC<CommentContainerProps> = (props: CommentContainerProps) => {
    const { postId } = props;
    const theme = useTheme();

    const [comments, setComments] = useState<Comment[] | null>(null);

    const getComments = async () => {
        const response = await comment_getAllByPost(postId);
        if (response.data) setComments(response.data);
    };

    const getSubComments = (commentId: string) => {
        const filteredComments = comments?.filter((comment) => comment.commentOn === commentId);
        return filteredComments?.map((comment) => (
            <CommentSection
                key={comment._id}
                comment={comment}
                getSubComments={getSubComments}
                getComments={getComments}
            />
        ));
    };

    useEffect(() => {
        getComments();
    }, [postId]);

    return comments && comments.length ? (
        <Paper sx={{ mt: theme.spacing(1), p: theme.spacing(2), backgroundColor: theme.palette.backgroundLight.main }}>
            {comments
                .filter((comment) => !comment.commentOn)
                .map((comment) => (
                    <CommentSection
                        key={comment._id}
                        comment={comment}
                        getSubComments={getSubComments}
                        getComments={getComments}
                    />
                ))}
        </Paper>
    ) : (
        <Paper sx={{ mt: theme.spacing(1), p: theme.spacing(2), backgroundColor: theme.palette.backgroundLight.main }}>
            <Typography variant="body1">No Comments Here. Start the conversation now!</Typography>
        </Paper>
    );
};

export default CommentContainer;
