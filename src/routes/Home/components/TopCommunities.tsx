import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import SpriteIcon from "common/components/SpriteIcon";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingCard from "../../../common/components/Loading/LoadingCard";
import { Community, community_getAll } from "../../Uplink/api/community/community.api";

interface CommunityListItemProps {
    link: string;
}

const CommunityListItem: FC<CommunityListItemProps> = (props: CommunityListItemProps) => {
    const { link } = props;
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <ListItem
            divider
            disablePadding
            sx={{
                backgroundColor: theme.palette.backgroundLight.main,
                borderRadius: theme.spacing(0.75),
                mb: theme.spacing(0.75),
            }}
        >
            <ListItemButton onClick={() => navigate(`/c/${link}`)}>
                <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar
                        sx={{
                            height: 16,
                            width: 16,
                            mr: theme.spacing(1),
                            backgroundColor: theme.palette.common.white,
                        }}
                    >
                        <SpriteIcon seed={link} size={12} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`c/${link}`} primaryTypographyProps={{ noWrap: true, fontSize: 12 }} />
            </ListItemButton>
        </ListItem>
    );
};

const TopCommunities: FC = () => {
    const theme = useTheme();

    const [communities, setCommunities] = useState<Community[] | null>(null);

    const getTopCommunities = async () => {
        const response = await community_getAll();
        if (response.data) {
            const communityUnsorted = response.data as Community[];
            const communitySortedAndTopTen = communityUnsorted
                .sort((a, b) => b.members.length - a.members.length)
                .slice(0, 10);
            setCommunities(communitySortedAndTopTen);
        }
    };

    useEffect(() => {
        getTopCommunities();
    }, []);

    return (
        <Paper sx={{ width: "100%", height: "auto", mb: theme.spacing(2) }}>
            <Typography variant="h4" sx={{ ml: 1, mt: 1 }}>
                Top Communities
            </Typography>
            {communities ? (
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <List dense sx={{ background: "none" }}>
                            {communities
                                .filter((community, index) => index <= 4)
                                .map((community) => (
                                    <CommunityListItem key={community._id} link={community.link} />
                                ))}
                        </List>
                    </Grid>
                    <Grid xs={6}>
                        <List dense sx={{ background: "none" }}>
                            {communities
                                .filter((community, index) => index > 4)
                                .map((community) => (
                                    <CommunityListItem key={community._id} link={community.link} />
                                ))}
                        </List>
                    </Grid>
                </Grid>
            ) : (
                <LoadingCard />
            )}
        </Paper>
    );
};

export default TopCommunities;
