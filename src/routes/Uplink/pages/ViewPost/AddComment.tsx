import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUser } from "common/context/User/UserContext";
import { ChangeEvent, FC, useState } from "react";

interface AddCommentProps {
    handleAddComment: (text: string) => void;
}

const AddComment: FC<AddCommentProps> = (props: AddCommentProps) => {
    const theme = useTheme();
    const user = useUser();
    const { handleAddComment } = props;

    const [commentText, setCommentText] = useState<string>("");

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => setCommentText(event.target.value);

    const handleSubmit = () => {
        handleAddComment(commentText);
        setCommentText("");
    };

    return (
        <Paper sx={{ p: theme.spacing(1) }}>
            <Typography variant="body2">Comment as {user.profile.uplinkUsername}</Typography>
            <TextField
                multiline={true}
                minRows={3}
                fullWidth
                variant="filled"
                label="What are your thoughts?"
                onChange={handleTextChange}
                value={commentText}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: theme.spacing(1) }}>
                <Button
                    variant="contained"
                    size="small"
                    data-testid="comment-submit-button"
                    disabled={!commentText}
                    onClick={handleSubmit}
                >
                    Comment
                </Button>
            </Box>
        </Paper>
    );
};

export default AddComment;
