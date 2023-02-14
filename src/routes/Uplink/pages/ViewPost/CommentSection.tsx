import AddCommentIcon from "@mui/icons-material/AddComment";
import ReportIcon from "@mui/icons-material/Report";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { useUser } from "common/context/User/UserContext";
import moment from "moment";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Comment, CommentPopulated, comment_postOne } from "routes/Uplink/api/comment/comment.api";
import CommentVoting from "routes/Uplink/components/CommentVoting";
import { updateVotes } from "routes/Uplink/functions/comments";
import { formatCountVotes } from "routes/Uplink/functions/posts";
import useSnack from "../../../../common/components/SnackBar/ProvideSnack";

interface CommentSectionProps {
    comment: CommentPopulated;
    getSubComments: (commentId: string) => JSX.Element[] | undefined;
    getComments: () => void;
}

const CommentSection: FC<CommentSectionProps> = (props: CommentSectionProps) => {
    const user = useUser();
    const theme = useTheme();
    const snack = useSnack();
    const { comment, getSubComments, getComments } = props;
    const [subCommentText, setSubCommentText] = useState<string>("");
    const [showTextField, setShowTextField] = useState<boolean>(false);

    const toggleReply = () => setShowTextField(!showTextField);

    const handleSubmit = async () => {
        const reply: Comment = {
            commentOn: comment._id,
            text: subCommentText,
            user: user.profile._id,
            post: comment.post,
            upVotes: [user.profile._id],
        } as Comment;
        const response = await comment_postOne(reply);
        if (response.data) {
            setSubCommentText("");
            setShowTextField(false);
            getComments();
        } else {
            snack("error", "Error adding comment.");
        }
    };

    const handleChangeVote = async (change: "upVote" | "downVote" | "noVote") => {
        const response = await updateVotes(
            comment._id,
            comment.upVotes as string[],
            comment.downVotes as string[],
            user.profile._id,
            change,
        );
        if (response === "success") getComments();
        else snack("error", "Error changing vote.");
    };

    const userUpVoted = comment.upVotes?.includes(user.profile._id) as boolean;
    const userDownVoted = comment.downVotes?.includes(user.profile._id) as boolean;
    const voteCount = formatCountVotes(comment.upVotes?.length || 0, comment.downVotes?.length || 0);

    return (
        <Box key={comment._id} sx={{ ml: { xs: theme.spacing(0.75), md: theme.spacing(2) }, mt: theme.spacing(1) }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Avatar
                    sx={{
                        height: 16,
                        width: 16,
                        mr: theme.spacing(1),
                        backgroundColor: theme.palette.common.white,
                    }}
                >
                    <SpriteIcon seed={comment.user.uplinkUsername as string} size={12} />
                </Avatar>
                <Typography
                    variant="body2"
                    component={Link}
                    to={`/u/${comment.user.uplinkUsername}`}
                    sx={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    u/{comment.user.uplinkUsername}
                </Typography>
                <Typography variant="body2" sx={{ ml: theme.spacing(2), fontStyle: "italic" }}>
                    {moment(comment.createdAt).fromNow()}
                </Typography>
            </Box>
            <Typography sx={{ whiteSpace: "pre-line" }}>{comment.text}</Typography>
            <Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CommentVoting
                        handleChangeVote={handleChangeVote}
                        voteCount={voteCount}
                        userUpVoted={userUpVoted}
                        userDownVoted={userDownVoted}
                    />
                    <Button
                        size="small"
                        sx={{ mr: theme.spacing(1), minWidth: "auto" }}
                        startIcon={<AddCommentIcon fontSize="small" />}
                        onClick={toggleReply}
                    >
                        Reply
                    </Button>
                    <Button
                        disabled
                        size="small"
                        sx={{ mr: theme.spacing(1), minWidth: "auto" }}
                        color="warning"
                        startIcon={<ReportIcon fontSize="small" />}
                    >
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
                            aria-label="Reply to Comment"
                            fullWidth
                            variant="filled"
                            onChange={(e) => setSubCommentText(e.target.value)}
                            value={subCommentText}
                            hiddenLabel
                            data-testid="comment-reply"
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: theme.spacing(1) }}>
                            <Button
                                variant="contained"
                                size="small"
                                disabled={!subCommentText}
                                onClick={handleSubmit}
                                data-testid="comment-submit-reply"
                            >
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
