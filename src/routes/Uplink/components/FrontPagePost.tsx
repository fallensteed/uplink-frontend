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
import { convertToTimePast } from "../../../common/functions/dates";
import { Post } from "../api/post/post.api";

interface FrontPagePostProps {
    post: Post;
}

const FrontPagePost: FC<FrontPagePostProps> = (props: FrontPagePostProps) => {
    const { post } = props;
    const theme = useTheme();

    const countVotes = () => {
        const upVotes = post.upVotes?.length || 0;
        const downVotes = post.downVotes?.length || 0;
        return upVotes - downVotes;
    };

    const countComments = () => {
        const count = post.comments?.length || 0;
        if (count === 0) {
            return null;
        } else {
            return `${count} `;
        }
    };

    const getTimeSincePost = () => {
        const [count, type] = convertToTimePast(post.createdAt as string);
        if (count > 1) {
            return `${count} ${type}s ago`;
        } else {
            return `${count} ${type} ago`;
        }
    };

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
                <Typography>{countVotes()}</Typography>
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
                    flexDirection: "row",
                }}
            >
                {post.imageSrc ? (
                    <Box
                        component="img"
                        src={post.imageSrc}
                        sx={{ height: "112px", width: "112px", backgroundColor: "#000", m: theme.spacing(0.5) }}
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
                    <Box>
                        <Typography sx={{ display: "inline-block", mr: theme.spacing(1) }}>{post.title}</Typography>
                        {post.link ? (
                            <Typography component="a" href={post.link} target="_blank">
                                {removeHttp(post.link)}
                            </Typography>
                        ) : null}
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography>{post.community}</Typography>
                            <Typography>Posted by {post.userCreated}</Typography>
                            <Typography>{getTimeSincePost()}</Typography>
                        </Box>
                        <Box>
                            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<CommentIcon />}>
                                {countComments()}Comments
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
