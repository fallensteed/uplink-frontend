import CommentIcon from "@mui/icons-material/Comment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportIcon from "@mui/icons-material/Report";
import ShareIcon from "@mui/icons-material/Share";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeHttp } from "common/functions/links";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostPopulated } from "routes/Uplink/api/post/post.api";
import { formatCountComments, formatCountVotes, getTimeSincePost } from "routes/Uplink/functions/posts";

interface PostContainerProps {
    post: PostPopulated;
    commentCount: number;
}

const PostContainer: FC<PostContainerProps> = (props: PostContainerProps) => {
    const { post, commentCount } = props;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Paper sx={{ display: "flex", flexDirection: "row", mb: theme.spacing(1) }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "54px",
                    minHeight: "100px",
                }}
            >
                <IconButton size="small">
                    <KeyboardArrowUpIcon />
                </IconButton>
                <Typography>{formatCountVotes(post.upVotes?.length || 0, post.downVotes?.length || 0)}</Typography>
                <IconButton size="small">
                    <KeyboardArrowDownIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.backgroundLight.main,
                    borderRadius: "0 4px 4px 0",
                    p: theme.spacing(1),
                    display: "flex",
                    flexDirection: "row",
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
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex" }}>
                                <Typography
                                    variant="body2"
                                    component={Link}
                                    to={`../c/${post.community.link}`}
                                    sx={{
                                        color: "#000",
                                        fontWeight: "bold",
                                        mr: theme.spacing(2),
                                        textDecoration: "none",
                                    }}
                                >
                                    c/{post.community.link}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#000" }}>
                                    Posted by{" "}
                                    <Link to={`../u/${post.userCreated.uplinkUsername}`}>
                                        u/{post.userCreated.uplinkUsername}
                                    </Link>
                                </Typography>
                            </Box>
                            <Typography variant="body2">{getTimeSincePost(post.createdAt)}</Typography>
                        </Box>
                        <Box sx={{ mt: theme.spacing(2) }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    display: "inline-block",
                                    mr: theme.spacing(1),
                                    color: "#000",
                                    textDecoration: "none",
                                }}
                            >
                                {post.title}
                            </Typography>
                        </Box>
                        {post.imageSrc ? (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Box
                                    component="img"
                                    src={post.imageSrc}
                                    sx={{
                                        maxHeight: "800px",
                                        maxWidth: "100%",
                                        m: theme.spacing(0.5),
                                        display: "block",
                                    }}
                                />
                            </Box>
                        ) : null}
                        {post.link ? (
                            <Typography variant="body1" component="a" href={post.link} target="_blank">
                                {removeHttp(post.link)}
                            </Typography>
                        ) : null}
                        <Box>
                            <Typography variant="body1" sx={{ m: theme.spacing(2) }}>
                                {post.detail}
                            </Typography>
                        </Box>
                        <Box>
                            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<CommentIcon />}>
                                {formatCountComments(commentCount)}Comments
                            </Button>
                            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<ShareIcon />}>
                                Share
                            </Button>
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
