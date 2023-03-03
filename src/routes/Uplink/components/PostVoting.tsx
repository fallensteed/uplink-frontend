import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { FC } from "react";

interface PostVotingProps {
    handleChangeVote: (change: "upVote" | "downVote" | "noVote") => Promise<void>;
    voteCount: number;
    userUpVoted: boolean;
    userDownVoted: boolean;
}

const PostVoting: FC<PostVotingProps> = (props: PostVotingProps) => {
    const { handleChangeVote, voteCount, userUpVoted, userDownVoted } = props;
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: { xs: 36, md: 54 },
                minHeight: "100px",
            }}
        >
            <IconButton
                data-testid="up-vote-button"
                size="small"
                onClick={() => handleChangeVote(userUpVoted ? "noVote" : "upVote")}
                sx={{
                    backgroundColor: userUpVoted ? theme.palette.primary.light : "none",
                    color: userUpVoted ? "white" : "inherit",
                    padding: 0,
                    my: theme.spacing(0.5),
                }}
            >
                <KeyboardArrowUpIcon />
            </IconButton>
            <Typography data-testid="vote-count">{voteCount}</Typography>
            <IconButton
                data-testid="down-vote-button"
                size="small"
                onClick={() => handleChangeVote(userDownVoted ? "noVote" : "downVote")}
                sx={{
                    backgroundColor: userDownVoted ? theme.palette.primary.light : "none",
                    color: userDownVoted ? "white" : "inherit",
                    padding: 0,
                    my: theme.spacing(0.5),
                }}
            >
                <KeyboardArrowDownIcon />
            </IconButton>
        </Box>
    );
};

export default PostVoting;
