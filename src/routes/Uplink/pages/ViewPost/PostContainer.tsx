import CommentIcon from "@mui/icons-material/Comment";
import ReportIcon from "@mui/icons-material/Report";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeHttp } from "common/functions/links";
import { FC, useContext } from "react";
import { PostPopulated } from "routes/Uplink/api/post/post.api";
import PostDetail from "routes/Uplink/components/PostDetail";
import PostVoting from "routes/Uplink/components/PostVoting";
import ShareButton from "routes/Uplink/components/ShareButton";
import { formatCountComments, formatCountVotes, updateVotes } from "routes/Uplink/functions/posts";
import { User } from "../../../../common/api/user/user.api";
import { UserContext } from "../../../Root";

interface PostContainerProps {
    post: PostPopulated;
    getPost: () => Promise<void>;
}

const PostContainer: FC<PostContainerProps> = (props: PostContainerProps) => {
    const { post, getPost } = props;
    const theme = useTheme();
    const user = useContext(UserContext) as User;

    const handleChangeVote = async (change: "upVote" | "downVote" | "noVote") => {
        const response = await updateVotes(
            post._id,
            post.upVotes as string[],
            post.downVotes as string[],
            user._id,
            change,
        );
        if (response === "success") getPost();
    };

    const userUpVoted = post.upVotes?.includes(user._id) as boolean;
    const userDownVoted = post.downVotes?.includes(user._id) as boolean;
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
                    borderRadius: "0 4px 4px 0",
                    p: theme.spacing(1),
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
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
                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                {post.imageSrc ? (
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                        <Box
                                            component="img"
                                            src={post.imageSrc}
                                            sx={{
                                                maxHeight: "600px",
                                                maxWidth: "100%",
                                                objectFit: "contain",
                                                m: theme.spacing(0.5),
                                                display: "block",
                                            }}
                                            alt={post.imageSrc}
                                            data-testid="post-image"
                                        />
                                    </Box>
                                ) : null}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        display: "inline-block",
                                        mr: theme.spacing(1),
                                        mt: theme.spacing(2),
                                    }}
                                >
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" sx={{ m: theme.spacing(2), whiteSpace: "pre-line" }}>
                                    {post.detail}
                                </Typography>
                                {post.link ? (
                                    <Typography
                                        variant="body1"
                                        component="a"
                                        href={post.link}
                                        target="_blank"
                                        data-testid="post-link"
                                    >
                                        {removeHttp(post.link)}
                                    </Typography>
                                ) : null}
                            </Box>
                            <PostDetail
                                style="vertical"
                                createdAt={post.createdAt}
                                communityLink={post.community.link}
                                username={post.userCreated.uplinkUsername}
                            />
                        </Box>

                        <Box>
                            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<CommentIcon />}>
                                {formatCountComments(post.commentCount)}
                            </Button>
                            <ShareButton link={`${window.location.host}/c/${post.community.link}/p/${post.miniLink}`} />
                            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<StarBorderIcon />}>
                                Favorite
                            </Button>
                            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<ReportIcon />}>
                                Report
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default PostContainer;
