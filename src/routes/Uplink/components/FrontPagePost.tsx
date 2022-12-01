import CommentIcon from "@mui/icons-material/Comment";
import ReportIcon from "@mui/icons-material/Report";
import ShareIcon from "@mui/icons-material/Share";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeHttp } from "common/functions/links";
import moment from "moment";
import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../../common/api/user/user.api";
import { UserContext } from "../../Root";
import { PostPopulated } from "../api/post/post.api";
import { formatCountComments, formatCountVotes, updateVotes } from "../functions/posts";
import PostVoting from "./PostVoting";

interface FrontPagePostProps {
    post: PostPopulated;
    getPosts: () => Promise<void>;
}

const FrontPagePost: FC<FrontPagePostProps> = (props: FrontPagePostProps) => {
    const { post, getPosts } = props;
    const user = useContext(UserContext) as User;
    const theme = useTheme();
    const navigate = useNavigate();

    const handleChangeVote = async (change: "upVote" | "downVote" | "noVote") => {
        const response = await updateVotes(
            post._id,
            post.upVotes as string[],
            post.downVotes as string[],
            user._id,
            change,
        );
        if (response === "success") getPosts();
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
                        sx={{ height: "112px", width: "112px", objectFit: "cover", m: theme.spacing(0.5) }}
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
                                {formatCountComments(post.commentCount || 0)}
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
