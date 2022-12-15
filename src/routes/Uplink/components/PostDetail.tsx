import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

interface PostDetailProps {
    createdAt: string;
    communityLink: string;
    username: string;
    edited?: boolean;
    style: "vertical" | "horizontal";
}

const PostDetail: FC<PostDetailProps> = (props: PostDetailProps) => {
    const { createdAt, communityLink, username, edited, style } = props;
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: style === "vertical" ? "column" : "row",
                width: style === "vertical" ? 175 : "auto",
            }}
        >
            <Typography
                variant="body2"
                noWrap
                component={Link}
                to={`../c/${communityLink}`}
                sx={{
                    textAlign: "right",
                    fontWeight: 600,
                    mr: theme.spacing(1),
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                    "&:hover": { textDecoration: "underline" },
                }}
            >
                c/{communityLink}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: "right",
                    mr: theme.spacing(1),
                }}
            >
                Posted by{" "}
                <Typography
                    variant="body2"
                    noWrap
                    component={Link}
                    to={`../u/${username}`}
                    sx={{
                        textDecoration: "none",
                        color: theme.palette.text.primary,
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    u/{username}
                </Typography>
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: "right",
                    mr: theme.spacing(1),
                }}
            >
                {moment(createdAt).fromNow()}
            </Typography>
            {edited ? <Typography variant="body2">Edited</Typography> : null}
        </Box>
    );
};

export default PostDetail;
