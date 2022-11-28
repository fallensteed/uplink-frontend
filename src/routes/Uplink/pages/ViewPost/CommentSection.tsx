import AddCommentIcon from "@mui/icons-material/AddComment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Avatar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import moment from "moment";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "routes/Root";
import { Comment, comment_postOne } from "routes/Uplink/api/comment/comment.api";
import { formatCountVotes } from "routes/Uplink/functions/posts";

interface CommentSectionProps {
    comment: Comment;
    getSubComments: (commentId: string) => JSX.Element[] | undefined;
    getComments: () => void;
}

const CommentSection: FC<CommentSectionProps> = (props: CommentSectionProps) => {
    const user = useContext(UserContext);
    const theme = useTheme();
    const { comment, getSubComments, getComments } = props;
    const [subCommentText, setSubCommentText] = useState<string>("");
    const [showTextField, setShowTextField] = useState<boolean>(false);

    const toggleReply = () => setShowTextField(!showTextField);

    const handleSubmit = async () => {
        const reply: Comment = {
            commentOn: comment._id,
            text: subCommentText,
            user: user?._id as string,
            post: comment.post,
        } as Comment;
        const response = await comment_postOne(reply);
        if (response.data) {
            setSubCommentText("");
            setShowTextField(false);
            getComments();
        }
    };

    return (
        <Box key={comment._id} sx={{ ml: theme.spacing(2), mt: theme.spacing(1) }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Avatar
                    sx={{
                        height: 16,
                        width: 16,
                        mr: theme.spacing(1),
                        backgroundColor: theme.palette.common.white,
                    }}
                >
                    <SpriteIcon seed={user?.uplinkUsername as string} size={12} />
                </Avatar>
                <Typography
                    variant="body2"
                    component={Link}
                    to={`/u/${user?.uplinkUsername}`}
                    sx={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    u/{user?.uplinkUsername}
                </Typography>
                <Typography variant="body2" sx={{ ml: theme.spacing(2), fontStyle: "italic" }}>
                    {moment(comment.createdAt).fromNow()}
                </Typography>
            </Box>
            <Typography>{comment.text}</Typography>
            <Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mr: theme.spacing(1) }}>
                        <IconButton size="small">
                            <KeyboardArrowUpIcon />
                        </IconButton>
                        <Typography variant="body2">
                            {formatCountVotes(comment.upVotes?.length || 0, comment.downVotes?.length || 0)}
                        </Typography>
                        <IconButton size="small">
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>
                    <Button
                        size="small"
                        sx={{ mr: theme.spacing(1) }}
                        startIcon={<AddCommentIcon fontSize="small" />}
                        onClick={toggleReply}
                    >
                        Reply
                    </Button>
                    <Button size="small" sx={{ mr: theme.spacing(1) }}>
                        Favorite
                    </Button>
                    <Button size="small" sx={{ mr: theme.spacing(1) }} color="warning">
                        Report
                    </Button>
                </Box>
            </Box>
            <Box sx={{ borderLeft: "1px solid #000", width: "100%" }}>
                {showTextField ? (
                    <Box sx={{ p: theme.spacing(2), pt: theme.spacing(1), pb: 0 }}>
                        <TextField
                            multiline={true}
                            minRows={3}
                            fullWidth
                            variant="filled"
                            onChange={(e) => setSubCommentText(e.target.value)}
                            value={subCommentText}
                            hiddenLabel
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: theme.spacing(1) }}>
                            <Button variant="contained" size="small" disabled={!subCommentText} onClick={handleSubmit}>
                                Reply
                            </Button>
                        </Box>
                    </Box>
                ) : null}
                {getSubComments(comment._id)}
            </Box>
        </Box>
    );
};

export default CommentSection;
