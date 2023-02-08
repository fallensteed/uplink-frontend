import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { Comment } from "./../../api/comment/comment.api";
import CommentSection from "./CommentSection";

interface CommentContainerProps {
    comments: Comment[];
    getComments: () => void;
}

const CommentContainer: FC<CommentContainerProps> = (props: CommentContainerProps) => {
    const { comments, getComments } = props;
    const theme = useTheme();

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

    return comments && comments.length ? (
        <Paper
            id="comments"
            sx={{
                mt: theme.spacing(1),
                p: { xs: theme.spacing(1), md: theme.spacing(2) },
                backgroundColor: theme.palette.backgroundLight.main,
            }}
        >
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
