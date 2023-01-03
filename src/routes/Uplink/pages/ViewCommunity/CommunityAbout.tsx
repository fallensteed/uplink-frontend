import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";

interface CommunityAboutProps {
    about: string | undefined;
}

const CommunityAbout: FC<CommunityAboutProps> = (props: CommunityAboutProps) => {
    const { about } = props;
    const theme = useTheme();

    return about ? (
        <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
            <Typography variant="h4">About this Community</Typography>
            <Typography variant="body1">{about}</Typography>
        </Paper>
    ) : null;
};

export default CommunityAbout;
