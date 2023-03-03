import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Avatar, Box, Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import useSnack from "common/components/SnackBar/ProvideSnack";
import SpriteIcon from "common/components/SpriteIcon";
import { useUser } from "common/context/User/UserContext";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import AddPostFauxTextBox from "routes/Uplink/components/AddPostFauxTextBox";
import MessageCard from "routes/Uplink/components/MessageCard";
import PostList from "routes/Uplink/components/PostList";
import { PostRequestSort, PostRequestType, PostSendRequest } from "routes/Uplink/types/post.interface";
import LoadingCard from "../../../../common/components/Loading/LoadingCard";
import backgroundImage from "../../../../common/images/background_1.png";
import {
    CommunityPopulated,
    community_adjustMembership,
    community_getByIdOrLink,
} from "../../api/community/community.api";
import { PostPopulated, post_getOnePost, post_getRequest } from "../../api/post/post.api";
import CommunityAbout from "./CommunityAbout";
import CommunityMods from "./CommunityMods";
import CommunityRules from "./CommunityRules";

const ViewCommunity: FC = () => {
    const theme = useTheme();
    const snack = useSnack();
    const user = useUser();
    const { communityLink } = useParams();

    const [posts, setPosts] = useState<PostPopulated[]>([]);
    const [type, setType] = useState<PostRequestType>("community");
    const [sort, setSort] = useState<PostRequestSort>("newest");
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [id, setId] = useState<string>(communityLink as string);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const [community, setCommunity] = useState<CommunityPopulated | null>(null);
    const [buttonText, setButtonText] = useState<string>("Joined");

    const getCommunity = async (link: string) => {
        setId(communityLink as string);
        const response = await community_getByIdOrLink(link);
        if (response.data) setCommunity(response.data);
        else snack("error", "Something went wrong loading community data.");
    };

    const getPosts = async () => {
        if (page === 1) setLoading(true);
        const request = {} as PostSendRequest;
        if (type) request.type = type;
        if (sort) request.sort = sort;
        if (limit) request.limit = limit;
        if (page) request.page = page;
        if (id) request.id = id;
        const response = await post_getRequest(request);
        if (response.data && page === 1) {
            setTotalPages(response.data.totalPages);
            setPosts(response.data.docs);
        } else if (response.data && page > 1) {
            setTotalPages(response.data.totalPages);
            const updatedPosts = posts.concat(response.data.docs);
            setPosts(updatedPosts);
        } else {
            snack("error", "Error populating posts.");
        }
        setLoading(false);
    };

    const getNextPage = async () => {
        setPage(page + 1);
    };

    const getNewestPosts = () => {
        setSort("newest");
        setPage(1);
    };

    const getTopRatedPosts = () => {
        setSort("rating");
        setPage(1);
    };

    const updatePostData = async (id: string) => {
        const response = await post_getOnePost(id);
        const index = posts.findIndex((post) => post._id === id);
        const updatedPosts = [...posts];
        updatedPosts[index] = response.data;
        setPosts(updatedPosts);
    };

    useEffect(() => {
        if (communityLink) getCommunity(communityLink);
    }, [communityLink]);

    useEffect(() => {
        if (communityLink) getPosts();
    }, [page, type, sort, id]);

    const handleLeaveCommunity = async () => {
        const response = await community_adjustMembership(
            community?._id as string,
            user.profile._id,
            "members",
            "remove",
        );
        if (response.data) getCommunity(community?._id as string);
        else snack("error", "Something went wrong.");
    };

    const handleJoinCommunity = async () => {
        const response = await community_adjustMembership(community?._id as string, user.profile._id, "members", "add");
        if (response.data) getCommunity(community?._id as string);
        else snack("error", "Something went wrong.");
    };

    const handleButtonText = (text?: string) => {
        if (text) return setButtonText(text);
        return setButtonText("Joined");
    };

    return community ? (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Box
                component="img"
                src={backgroundImage}
                sx={{ height: { xs: 125, md: 175 }, width: "100%", objectFit: "cover" }}
            />
            <Box
                sx={{
                    mr: theme.spacing(2),
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
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
                    {community.members?.filter((member) => member === user.profile._id).length ? (
                        <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={handleLeaveCommunity}
                            onMouseOver={() => handleButtonText("Leave")}
                            onMouseOut={() => handleButtonText()}
                            sx={{ width: 100, mb: { xs: theme.spacing(1), md: "auto" } }}
                        >
                            {buttonText}
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleJoinCommunity}
                            sx={{ width: 100, mb: { xs: theme.spacing(1), md: "auto" } }}
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
                            {community.members.includes(user.profile._id) ? <AddPostFauxTextBox /> : null}
                            <Paper sx={{ mb: theme.spacing(2) }}>
                                <Button
                                    startIcon={<LightModeIcon />}
                                    sx={{ m: theme.spacing(1) }}
                                    color={sort === "newest" && !type ? "secondary" : "primary"}
                                    onClick={getNewestPosts}
                                >
                                    Newest
                                </Button>
                                <Button
                                    startIcon={<AutoGraphIcon />}
                                    sx={{ m: theme.spacing(1) }}
                                    color={sort === "rating" && !type ? "secondary" : "primary"}
                                    onClick={getTopRatedPosts}
                                >
                                    Top Rated
                                </Button>
                                <Button disabled startIcon={<PushPinIcon />} sx={{ m: theme.spacing(1) }}>
                                    Pinned
                                </Button>
                            </Paper>
                            {!loading ? (
                                <InfiniteScroll
                                    dataLength={posts.length}
                                    next={getNextPage}
                                    hasMore={page < totalPages}
                                    loader={<LoadingCard />}
                                    endMessage={
                                        posts.length ? (
                                            <MessageCard message="Nothing else to see!" />
                                        ) : (
                                            <MessageCard message="This community doesn't have any posts yet!" />
                                        )
                                    }
                                >
                                    <PostList posts={posts} getPosts={updatePostData} />
                                </InfiniteScroll>
                            ) : (
                                <LoadingCard />
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
        <LoadingCard />
    );
};

export default ViewCommunity;
