import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LightModeIcon from "@mui/icons-material/LightMode";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box, Button, Card, CardContent, CircularProgress, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import useSnack from "common/components/SnackBar/ProvideSnack";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "routes/Uplink/components/PostList";
import { User, user_getByUsername } from "../../../../common/api/user/user.api";
import backgroundImage from "../../../../common/images/background_2.png";
import { Community } from "../../api/community/community.api";
import { PostPopulated, post_getAllByUser } from "../../api/post/post.api";
import { uplink_user_getMember, uplink_user_getModerator } from "../../api/user/uplink_user.api";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";
import UserMember from "./UserMember";
import UserModerator from "./UserModerator";
import UserProfile from "./UserProfile";

const ViewUser: FC = () => {
    const theme = useTheme();
    const snack = useSnack();
    const { uplinkUsername } = useParams();

    const [posts, setPosts] = useState<PostPopulated[] | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [moderator, setModerator] = useState<Community[] | null>(null);
    const [member, setMember] = useState<Community[] | null>(null);

    const getUserPosts = async () => {
        const response = await post_getAllByUser(uplinkUsername as string);
        if (response.data) setPosts(response.data);
        else snack("error", "Something went wrong loading post data.");
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
            getUserPosts();
            getUserModerator(uplinkUsername);
            getUserMember(uplinkUsername);
        }
    }, [uplinkUsername]);

    return selectedUser && posts ? (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Box component="img" src={backgroundImage} sx={{ height: 175, width: "100%", objectFit: "cover" }} />
            <Container maxWidth="lg" sx={{ mt: 4, height: "calc(100% - 32px)" }}>
                <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid md={7} xs={12} sx={{ height: "100%" }}>
                        <Box>
                            {posts.length ? (
                                <>
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
                                    <PostList posts={posts} getPosts={getUserPosts} />
                                </>
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
                                        <Typography>There are no posts by this user.</Typography>
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

export default ViewUser;
