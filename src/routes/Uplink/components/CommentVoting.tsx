import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { FC } from "react";

interface CommentVotingProps {
    handleChangeVote: (change: "upVote" | "downVote" | "noVote") => Promise<void>;
    voteCount: number;
    userUpVoted: boolean;
    userDownVoted: boolean;
}

const CommentVoting: FC<CommentVotingProps> = (props: CommentVotingProps) => {
    const { handleChangeVote, voteCount, userUpVoted, userDownVoted } = props;
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mr: theme.spacing(1) }}>
            <IconButton
                size="small"
                onClick={() => handleChangeVote(userUpVoted ? "noVote" : "upVote")}
                sx={{
                    backgroundColor: userUpVoted ? theme.palette.primary.light : "none",
                    color: userUpVoted ? "white" : "inherit",
                    padding: 0,
                    mx: theme.spacing(0.5),
                }}
            >
                <KeyboardArrowUpIcon />
            </IconButton>
            <Typography variant="body2">{voteCount}</Typography>
            <IconButton
                size="small"
                onClick={() => handleChangeVote(userDownVoted ? "noVote" : "downVote")}
                sx={{
                    backgroundColor: userDownVoted ? theme.palette.primary.light : "none",
                    color: userDownVoted ? "white" : "inherit",
                    padding: 0,
                    mx: theme.spacing(0.5),
                }}
            >
                <KeyboardArrowDownIcon />
            </IconButton>
        </Box>
    );
};

export default CommentVoting;
