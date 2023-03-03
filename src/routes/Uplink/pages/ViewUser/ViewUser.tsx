import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Button, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import LoadingCard from "common/components/Loading/LoadingCard";
import useSnack from "common/components/SnackBar/ProvideSnack";
import { useUser } from "common/context/User/UserContext";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import AddPostFauxTextBox from "routes/Uplink/components/AddPostFauxTextBox";
import MessageCard from "routes/Uplink/components/MessageCard";
import PostList from "routes/Uplink/components/PostList";
import { PostRequestSort, PostRequestType, PostSendRequest } from "routes/Uplink/types/post.interface";
import { User, user_getByUsername } from "../../../../common/api/user/user.api";
import backgroundImage from "../../../../common/images/background_2.png";
import { Community } from "../../api/community/community.api";
import { PostPopulated, post_getOnePost, post_getRequest } from "../../api/post/post.api";
import { uplink_user_getMember, uplink_user_getModerator } from "../../api/user/uplinkUser.api";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";
import UserMember from "./UserMember";
import UserModerator from "./UserModerator";
import UserProfile from "./UserProfile";

type SortFilter = "Newest" | "Saved";

const ViewUser: FC = () => {
    const theme = useTheme();
    const snack = useSnack();
    const { uplinkUsername } = useParams();
    const user = useUser();

    const [posts, setPosts] = useState<PostPopulated[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [moderator, setModerator] = useState<Community[] | null>(null);
    const [member, setMember] = useState<Community[] | null>(null);
    const [type, setType] = useState<PostRequestType>("username");
    const [sort, setSort] = useState<PostRequestSort>("newest");
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [id, setId] = useState<string>(uplinkUsername as string);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

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
        setType("username");
        setId(uplinkUsername as string);
        setSort("newest");
        setPage(1);
    };

    const getTopRatedPosts = () => {
        setType("username");
        setId(uplinkUsername as string);
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

    const getSelectedUser = async (username: string) => {
        const response = await user_getByUsername(username);
        if (response.data) setSelectedUser(response.data);
        else snack("error", "Something went wrong loading user data.");
    };

    const getUserModerator = async (username: string) => {
        const response = await uplink_user_getModerator(username);
        if (response.data) setModerator(response.data);
        else snack("error", "Something went wrong loading moderator data.");
    };

    const getUserMember = async (username: string) => {
        const response = await uplink_user_getMember(username);
        if (response.data) setMember(response.data);
        else snack("error", "Something went wrong loading member data.");
    };

    useEffect(() => {
        if (uplinkUsername) {
            getSelectedUser(uplinkUsername);
            getUserModerator(uplinkUsername);
            getUserMember(uplinkUsername);
        }
    }, [uplinkUsername]);

    useEffect(() => {
        if (uplinkUsername) getPosts();
    }, [page, type, sort]);

    return selectedUser ? (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Box component="img" src={backgroundImage} sx={{ height: 175, width: "100%", objectFit: "cover" }} />
            <Container maxWidth="lg" sx={{ mt: 4, height: "calc(100% - 32px)" }}>
                <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid md={7} xs={12} sx={{ height: "100%" }}>
                        <Box>
                            {user.profile.uplinkUsername === uplinkUsername ? <AddPostFauxTextBox /> : null}
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
                            </Paper>
                            {!loading ? (
                                <InfiniteScroll
                                    dataLength={posts.length}
                                    next={getNextPage}
                                    hasMore={page < totalPages}
                                    loader={<LoadingCard />}
                                    endMessage={
                                        posts.length ? (
                                            <MessageCard message="That's all folks!" />
                                        ) : (
                                            <MessageCard message="This user hasn't made any posts yet!" />
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
                            <UserProfile username={selectedUser.uplinkUsername} birthday={selectedUser.birthday} />
                            <UserModerator moderator={moderator} />
                            <UserMember member={member} />
                            <UserFollowers />
                            <UserFollowing />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    ) : (
        <LoadingCard />
    );
};

export default ViewUser;
