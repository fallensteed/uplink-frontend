import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, useContext, useState } from "react";
import { UserContext } from "routes/Root";
import { Comment, comment_postOne } from "routes/Uplink/api/comment/comment.api";

interface CommentSectionProps {
    comment: Comment;
    getSubComments: (commentId: string) => JSX.Element[] | undefined;
    getComments: () => void;
}

const CommentSection: FC<CommentSectionProps> = (props: CommentSectionProps) => {
    const user = useContext(UserContext);
    const theme = useTheme();
    const { comment, getSubComments, getComments } = props;
    const [subCommentText, setSubCommentText] = useState("");

    const handleReply = async () => {
        const reply: Comment = {
            commentOn: comment._id,
            text: subCommentText,
            user: user?._id as string,
            post: comment.post,
        } as Comment;
        const response = await comment_postOne(reply);
        if (response.data) {
            setSubCommentText("");
            getComments();
        }
    };

    return (
        <Box key={comment._id} sx={{ ml: theme.spacing(2), mt: theme.spacing(1) }}>
            <Typography>{comment.text}</Typography>
            <Button onClick={handleReply}>Reply</Button>
            <Box sx={{ borderLeft: "1px solid #000" }}>
                <TextField
                    sx={{ ml: theme.spacing(2) }}
                    variant="filled"
                    value={subCommentText}
                    onChange={(e) => setSubCommentText(e.target.value)}
                />
                {getSubComments(comment._id)}
            </Box>
        </Box>
    );
};

export default CommentSection;
