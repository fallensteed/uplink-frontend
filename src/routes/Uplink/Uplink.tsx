import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUser } from "common/context/User/UserContext";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import LoadingCard from "../../common/components/Loading/LoadingCard";
import useSnack from "../../common/components/SnackBar/ProvideSnack";
import { PostPopulated, post_getOnePost, post_getRequest } from "./api/post/post.api";
import AddPostFauxTextBox from "./components/AddPostFauxTextBox";
import MessageCard from "./components/MessageCard";
import PostList from "./components/PostList";
import { PostRequestSort, PostRequestType, PostSendRequest } from "./types/post.interface";

const Uplink: FC = () => {
    const theme = useTheme();
    const user = useUser();
    const navigate = useNavigate();
    const snack = useSnack();

    const [posts, setPosts] = useState<PostPopulated[]>([]);
    const [type, setType] = useState<PostRequestType>(null);
    const [sort, setSort] = useState<PostRequestSort>("newest");
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [id, setId] = useState<string>("");
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
        setType(null);
        setId("");
        setSort("newest");
        setPage(1);
    };

    const getTopRatedPosts = () => {
        setType(null);
        setId("");
        setSort("rating");
        setPage(1);
    };

    const getSavedPosts = () => {
        setId(user.profile._id);
        setType("saved");
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
        getPosts();
    }, [page, type, sort]);

    return (
        <Box>
            <AddPostFauxTextBox />
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
                <Button
                    startIcon={<BookmarkIcon />}
                    sx={{ m: theme.spacing(1) }}
                    color={type === "saved" ? "secondary" : "primary"}
                    onClick={getSavedPosts}
                >
                    Saved
                </Button>
            </Paper>

            {!loading ? (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={getNextPage}
                    hasMore={page < totalPages}
                    loader={<LoadingCard />}
                    endMessage={<MessageCard message="That's all folks!" />}
                >
                    <PostList posts={posts} getPosts={updatePostData} />
                </InfiniteScroll>
            ) : (
                <LoadingCard />
            )}
        </Box>
    );
};

export default Uplink;
