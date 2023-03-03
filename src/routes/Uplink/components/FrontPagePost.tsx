import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ReportIcon from "@mui/icons-material/Report";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUser } from "common/context/User/UserContext";
import { removeHttp } from "common/functions/links";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useSnack from "../../../common/components/SnackBar/ProvideSnack";
import { PostPopulated } from "../api/post/post.api";
import { formatCountComments, formatCountVotes, updateVotes } from "../functions/posts";
import { savePost, unsavePost } from "../functions/savedPosts";
import PostDetail from "./PostDetail";
import PostVoting from "./PostVoting";
import ShareButton from "./ShareButton";

interface FrontPagePostProps {
    post: PostPopulated;
    getPosts: (id: string) => Promise<void>;
}

const FrontPagePost: FC<FrontPagePostProps> = (props: FrontPagePostProps) => {
    const { post, getPosts } = props;
    const user = useUser();
    const snack = useSnack();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleChangeVote = async (change: "upVote" | "downVote" | "noVote") => {
        const response = await updateVotes(
            post._id,
            post.upVotes as string[],
            post.downVotes as string[],
            user.profile._id,
            change,
        );
        if (response === "success") getPosts(post._id);
    };

    const handleSavePost = async () => {
        const response = await savePost(user.uplink._id, user.uplink.savedPosts, post._id);
        if (response.data && response.data.modifiedCount === 1) {
            user.updateUserProfile();
            snack("success", "Post saved.");
        } else {
            snack("error", "Something went wrong.");
        }
    };

    const handleUnsavePost = async () => {
        const response = await unsavePost(user.uplink._id, user.uplink.savedPosts, post._id);
        if (response.data && response.data.modifiedCount === 1) {
            user.updateUserProfile();
            snack("success", "Removed saved post.");
        } else {
            snack("error", "Something went wrong.");
        }
    };

    const userUpVoted = post.upVotes?.includes(user.profile._id) as boolean;
    const userDownVoted = post.downVotes?.includes(user.profile._id) as boolean;
    const voteCount = formatCountVotes(post.upVotes?.length || 0, post.downVotes?.length || 0);

    return (
        <Paper sx={{ display: "flex", flexDirection: "row", mb: theme.spacing(1) }}>
            <PostVoting
                handleChangeVote={(change) => handleChangeVote(change)}
                voteCount={voteCount}
                userUpVoted={userUpVoted}
                userDownVoted={userDownVoted}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.backgroundLight.main,
                    minHeight: "100%",
                    borderRadius: "0 4px 4px 0",
                    p: theme.spacing(1),
                    display: "flex",
                    flexDirection: "column",
                    textAlign: { xs: "center", lg: "left" },
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    {post.imageSrc ? (
                        <Box sx={{ height: 112, width: 112, m: { xs: "auto", md: theme.spacing(0.5) } }}>
                            <Box
                                data-testid="post-image"
                                component="img"
                                src={post.imageSrc}
                                sx={{ height: "112px", width: "112px", objectFit: "cover" }}
                            />
                        </Box>
                    ) : null}
                    <Box
                        sx={{
                            m: theme.spacing(0.5),
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                return navigate(`/c/${post.community.link}/p/${post.miniLink}`);
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    mr: theme.spacing(1),
                                    color: "#000",
                                    textDecoration: "none",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    wordBreak: "break-word",
                                }}
                            >
                                {post.title}
                            </Typography>
                            {post.link ? (
                                <Typography component="a" href={post.link} target="_blank">
                                    {removeHttp(post.link)}
                                </Typography>
                            ) : null}
                        </Box>
                    </Box>
                    <PostDetail
                        createdAt={post.createdAt}
                        communityLink={post.community.link}
                        username={post.userCreated.uplinkUsername}
                    />
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
                        <Typography
                            variant="body2"
                            data-testid="comment-button"
                            sx={{
                                mr: theme.spacing(1),
                                textTransform: "uppercase",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <CommentIcon fontSize="small" sx={{ mr: theme.spacing(0.5) }} />{" "}
                            {formatCountComments(post.commentCount || 0)}
                        </Typography>
                        <ShareButton link={`${window.location.host}/c/${post.community.link}/p/${post.miniLink}`} />
                        {user.uplink.savedPosts?.includes(post._id) ? (
                            <Button
                                size="small"
                                sx={{ mr: theme.spacing(1) }}
                                onClick={handleUnsavePost}
                                startIcon={<BookmarkIcon />}
                            >
                                Saved
                            </Button>
                        ) : (
                            <Button
                                size="small"
                                sx={{ mr: theme.spacing(1) }}
                                onClick={handleSavePost}
                                startIcon={<BookmarkBorderIcon />}
                            >
                                Save
                            </Button>
                        )}
                        <Button disabled size="small" sx={{ mr: theme.spacing(1) }} startIcon={<ReportIcon />}>
                            Report
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default FrontPagePost;
