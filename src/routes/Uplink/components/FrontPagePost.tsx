import CommentIcon from "@mui/icons-material/Comment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportIcon from "@mui/icons-material/Report";
import ShareIcon from "@mui/icons-material/Share";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeHttp } from "common/functions/links";
import moment from "moment";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostPopulated } from "../api/post/post.api";
import { formatCountComments, formatCountVotes } from "../functions/posts";

interface FrontPagePostProps {
    post: PostPopulated;
}

const FrontPagePost: FC<FrontPagePostProps> = (props: FrontPagePostProps) => {
    const { post } = props;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Paper sx={{ display: "flex", flexDirection: "row", mb: theme.spacing(1) }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "54px",
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
                    minHeight: "100%",
                    borderRadius: "0 4px 4px 0",
                    p: theme.spacing(1),
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    textAlign: { xs: "center", lg: "left" },
                    alignItems: "center",
                }}
            >
                {post.imageSrc ? (
                    <Box
                        component="img"
                        src={post.imageSrc}
                        sx={{ maxHeight: "112px", maxWidth: "112px", objectFit: "contain", m: theme.spacing(0.5) }}
                    />
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
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                wordBreak: "break-word",
                            }}
                        >
                            {post.title}
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        {post.link ? (
                            <Typography component="a" href={post.link} target="_blank">
                                {removeHttp(post.link)}
                            </Typography>
                        ) : null}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                variant="body2"
                                component={Link}
                                to={`../c/${post.community.link}`}
                                sx={{
                                    textDecoration: "none",
                                    color: theme.palette.text.primary,
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                c/{post.community.link}
                            </Typography>
                            <Typography variant="body2">
                                Posted by{" "}
                                <Typography
                                    variant="body2"
                                    component={Link}
                                    to={`../u/${post.userCreated.uplinkUsername}`}
                                    sx={{
                                        textDecoration: "none",
                                        color: theme.palette.text.primary,
                                        "&:hover": { textDecoration: "underline" },
                                    }}
                                >
                                    u/{post.userCreated.uplinkUsername}
                                </Typography>
                            </Typography>
                            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                        </Box>
                        <Box
                            sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, flexWrap: "wrap" }}
                        >
                            <Button
                                size="small"
                                sx={{ mr: theme.spacing(1) }}
                                startIcon={<CommentIcon />}
                                component={Link}
                                to={`/c/${post.community.link}/p/${post.miniLink}#comments`}
                            >
                                {formatCountComments(post.comments?.length || 0)}Comments
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

export default FrontPagePost;
