import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import useSnack from "common/components/SnackBar/ProvideSnack";
import SpriteIcon from "common/components/SpriteIcon";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "routes/Uplink/components/PostList";
import backgroundImage from "../../../../common/images/background_1.png";
import { UserContext } from "../../../Root";
import {
    CommunityPopulated,
    community_adjustMembership,
    community_getByIdOrLink,
} from "../../api/community/community.api";
import { PostPopulated, post_getAllByCommunity } from "../../api/post/post.api";
import CommunityAbout from "./CommunityAbout";
import CommunityMods from "./CommunityMods";
import CommunityRules from "./CommunityRules";

const ViewCommunity: FC = () => {
    const theme = useTheme();
    const snack = useSnack();
    const user = useContext(UserContext);
    const { communityLink } = useParams();

    const [posts, setPosts] = useState<PostPopulated[] | null>(null);
    const [community, setCommunity] = useState<CommunityPopulated | null>(null);
    const [buttonText, setButtonText] = useState<string>("Joined");

    const getCommunityPosts = async () => {
        const response = await post_getAllByCommunity(communityLink as string);
        if (response.data) setPosts(response.data);
        else snack("error", "Something went wrong loading community posts.");
    };

    const getCommunity = async (link: string) => {
        const response = await community_getByIdOrLink(link);
        if (response.data) setCommunity(response.data);
        else snack("error", "Something went wrong loading community data.");
    };

    useEffect(() => {
        if (communityLink) {
            getCommunity(communityLink);
            getCommunityPosts();
        }
    }, [communityLink]);

    const handleLeaveCommunity = async () => {
        const response = await community_adjustMembership(
            community?._id as string,
            user?._id as string,
            "members",
            "remove",
        );
        if (response.data) getCommunity(community?._id as string);
        else snack("error", "Something went wrong.");
    };

    const handleJoinCommunity = async () => {
        const response = await community_adjustMembership(
            community?._id as string,
            user?._id as string,
            "members",
            "add",
        );
        if (response.data) getCommunity(community?._id as string);
        else snack("error", "Something went wrong.");
    };

    const handleButtonText = (text?: string) => {
        if (text) return setButtonText(text);
        return setButtonText("Joined");
    };

    return community ? (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Box component="img" src={backgroundImage} sx={{ height: 175, width: "100%", objectFit: "cover" }} />
            <Box
                sx={{
                    mr: theme.spacing(2),
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        height: 64,
                        width: 64,
                        m: theme.spacing(1),
                        backgroundColor: theme.palette.common.white,
                    }}
                >
                    <SpriteIcon seed={community?.link} size={48} />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h2">{community?.name}</Typography>
                    <Typography variant="subtitle1">c/{community?.link}</Typography>
                </Box>
                <Box
                    sx={{
                        mr: theme.spacing(2),
                    }}
                >
                    {community.members?.filter((member) => member._id === user?._id).length ? (
                        <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={handleLeaveCommunity}
                            onMouseOver={() => handleButtonText("Leave")}
                            onMouseOut={() => handleButtonText()}
                            sx={{ width: 100 }}
                        >
                            {buttonText}
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleJoinCommunity}
                            sx={{ width: 100 }}
                        >
                            Join
                        </Button>
                    )}
                </Box>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 4, height: "calc(100% - 32px)" }}>
                <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid md={7} xs={12} sx={{ height: "100%" }}>
                        <Box>
                            <Paper sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
                                <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                                    <SpriteIcon seed={`${user?.uplinkUsername}`} size={24} />
                                </Avatar>
                                <Button
                                    fullWidth
                                    id="add-new-post-field"
                                    variant="outlined"
                                    sx={{
                                        background: "#fff",
                                        m: theme.spacing(1),
                                        borderRadius: theme.spacing(0.5),
                                        justifyContent: "flex-start",
                                        cursor: "text",
                                        textTransform: "none",
                                        transition: "none",
                                        "&:hover": {
                                            backgroundColor: "#fff",
                                        },
                                    }}
                                    component={Link}
                                    to={`/submit/${communityLink}`}
                                >
                                    Add New Post
                                </Button>
                            </Paper>
                            <Paper sx={{ mb: theme.spacing(2) }}>
                                <Button startIcon={<LightModeIcon />} sx={{ m: theme.spacing(1) }}>
                                    Newest
                                </Button>
                                <Button startIcon={<AutoGraphIcon />} sx={{ m: theme.spacing(1) }}>
                                    Top Rated
                                </Button>
                                <Button startIcon={<PushPinIcon />} sx={{ m: theme.spacing(1) }}>
                                    Pinned
                                </Button>
                            </Paper>
                            {posts ? (
                                <PostList posts={posts} getPosts={getCommunityPosts} />
                            ) : (
                                <Card>
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography>Loading...</Typography>
                                        <CircularProgress />
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    </Grid>
                    <Grid md={5} xs={12} sx={{ height: "100%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CommunityAbout about={community.about} />
                            <CommunityRules rules={community.rules} />
                            <CommunityMods mods={community.moderators} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    ) : (
        <Card>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography>Loading...</Typography>
                <CircularProgress />
            </CardContent>
        </Card>
    );
};

export default ViewCommunity;
