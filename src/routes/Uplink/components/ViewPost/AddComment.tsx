import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChangeEvent, FC, useContext, useState } from "react";
import { UserContext } from "./../../../Root";

interface AddCommentProps {
    handleAddComment: (text: string) => void;
}

const AddComment: FC<AddCommentProps> = (props: AddCommentProps) => {
    const theme = useTheme();
    const user = useContext(UserContext);
    const { handleAddComment } = props;

    const [commentText, setCommentText] = useState<string>("");

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => setCommentText(event.target.value);

    const handleSubmit = () => {
        handleAddComment(commentText);
        setCommentText("");
    };

    return (
        <Paper sx={{ p: theme.spacing(1) }}>
            <Typography variant="body2">Comment as {user?.uplinkUsername}</Typography>
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
                <Button variant="contained" size="small" disabled={!commentText} onClick={handleSubmit}>
                    Comment
                </Button>
            </Box>
        </Paper>
    );
};

export default AddComment;
