import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { mockCommunityList } from "routes/Uplink/api/community/community.mock";
import SpaceForce36 from "../../../common/images/SpaceForce_36x36.png";

const mockCommunities = mockCommunityList;

interface CommunityListItemProps {
    _id: string;
    link: string;
}

const CommunityListItem: FC<CommunityListItemProps> = (props: CommunityListItemProps) => {
    const { _id, link } = props;
    const theme = useTheme();
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
            <ListItemButton>
                <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar src={SpaceForce36} sx={{ height: 24, width: 24 }} />
                </ListItemAvatar>
                <ListItemText primary={link} primaryTypographyProps={{ noWrap: true }} />
            </ListItemButton>
        </ListItem>
    );
};

const TopCommunities: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: theme.spacing(2) }}>
            <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
                Top Communities
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <List dense sx={{ background: "none" }}>
                        {mockCommunities
                            .filter((community, index) => index <= 4)
                            .map((community) => (
                                <CommunityListItem key={community._id} _id={community._id} link={community.link} />
                            ))}
                    </List>
                </Grid>
                <Grid xs={6}>
                    <List dense sx={{ background: "none" }}>
                        {mockCommunities
                            .filter((community, index) => index > 4)
                            .map((community) => (
                                <CommunityListItem key={community._id} _id={community._id} link={community.link} />
                            ))}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TopCommunities;
