import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Fab,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import { useUser } from "common/context/User/UserContext";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSnack from "../../../common/components/SnackBar/ProvideSnack";
import { Community, community_getAllByUserId, community_getByIdOrLink } from "../api/community/community.api";
import { Post, post_postOne } from "../api/post/post.api";

const NewPost: FC = () => {
    const theme = useTheme();
    const user = useUser();
    const { communityLink } = useParams();
    const navigate = useNavigate();
    const snack = useSnack();
    const [community, setCommunity] = useState<Community | null>(null);
    const [communityId, setCommunityId] = useState<string>("");
    const [memberCommunities, setMemberCommunities] = useState<Community[] | null>(null);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postText, setPostText] = useState<string>("");
    const [postLink, setPostLink] = useState<string>("");
    const [postImage, setPostImage] = useState<string>("");
    const [postNotifications, setPostNotifications] = useState<boolean>(true);

    const getCommunityData = async (link: string) => {
        const response = await community_getByIdOrLink(link);
        if (response.data) {
            setCommunity(response.data as Community);
            setCommunityId(response.data._id);
        }
    };

    const getMemberCommunities = async () => {
        const response = await community_getAllByUserId(user.profile._id);
        if (response.data) setMemberCommunities(response.data);
        else snack("error", "Something went wrong.");
    };

    const handleCommunityChange = (event: SelectChangeEvent) => {
        setCommunityId(event.target.value);
    };

    useEffect(() => {
        if (communityLink) getCommunityData(communityLink);
    }, [communityLink]);

    useEffect(() => {
        if (!user.isLoading) getMemberCommunities();
    }, [user]);

    const handleSubmitPost = async () => {
        if (!communityId) {
            snack("error", "Select a Community");
            return;
        }
        if (!postTitle) {
            snack("error", "Post Title Required");
            return;
        }
        if (!postText) {
            snack("error", "Post Text Required");
            return;
        }
        const data: Post = {} as Post;
        data["community"] = communityId;
        data["title"] = postTitle;
        data["detail"] = postText;
        if (postLink) data["link"] = postLink;
        if (postImage) data["imageSrc"] = postImage;
        data["draft"] = false;
        data["userCreated"] = user.profile._id;
        data["upVotes"] = [user.profile._id];
        data["userCreatedNotifications"] = postNotifications;
        const response = await post_postOne(data);
        if (response.data.miniLink) {
            snack("success", "Your Post has been created!");
            navigate(`/c/${communityLink}/p/${response.data.miniLink}`);
        } else {
            snack("error", "I think something went wrong");
            return;
        }
    };

    return (
        <Box sx={{ minHeight: "calc(100% - 16px)", width: "100%", position: "relative", pt: theme.spacing(2) }}>
            <Typography display="none" data-testid="location">
                {communityLink}
            </Typography>
            <Box
                sx={{
                    display: { xs: "none", lg: "block" },
                    position: "absolute",
                    top: theme.spacing(3),
                    left: theme.spacing(3),
                }}
            >
                <Fab variant="extended" color="primary" aria-label="back" onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ mr: theme.spacing(1) }} />
                    Back
                </Fab>
            </Box>
            <Container maxWidth="md">
                <Typography variant="h2" sx={{ mb: theme.spacing(1) }}>
                    Create a Post
                </Typography>
                <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(1) }}>
                    <Grid2 container spacing={1}>
                        <Grid2 xs={12} md={6}>
                            <FormControl fullWidth variant="filled" size="small" required>
                                <InputLabel id="community-select-label">Select a Community</InputLabel>
                                <Select
                                    labelId="community-select-label"
                                    id="community-select"
                                    value={communityId as string}
                                    onChange={handleCommunityChange}
                                >
                                    {memberCommunities && memberCommunities.length ? (
                                        memberCommunities.map((comm) => (
                                            <MenuItem key={comm._id} value={comm._id}>
                                                c/{comm.link}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem data-testid="no-communities" disabled>
                                            No Communities Available
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 xs={12} md={6}></Grid2>
                    </Grid2>
                </Paper>
                <Paper sx={{ p: theme.spacing(1) }}>
                    <TextField
                        required
                        label="Title"
                        variant="filled"
                        fullWidth
                        size="small"
                        margin="dense"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <TextField
                        required
                        label="Text"
                        variant="filled"
                        multiline={true}
                        minRows={5}
                        fullWidth
                        size="small"
                        margin="dense"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    />
                    <TextField
                        label="Link URL"
                        variant="filled"
                        fullWidth
                        size="small"
                        margin="dense"
                        value={postLink}
                        onChange={(e) => setPostLink(e.target.value)}
                    />
                    <TextField
                        label="Image URL"
                        variant="filled"
                        fullWidth
                        size="small"
                        margin="dense"
                        value={postImage}
                        onChange={(e) => setPostImage(e.target.value)}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: theme.spacing(2),
                        }}
                    >
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        value={postNotifications}
                                        onChange={(e) => setPostNotifications(e.target.checked)}
                                    />
                                }
                                label="Send me notifications on comments"
                            />
                        </Box>
                        <Box sx={{ mt: { xs: theme.spacing(1), md: "auto" } }}>
                            <Button variant="outlined" sx={{ mr: theme.spacing(1) }} disabled>
                                Save Draft
                            </Button>
                            <Button variant="contained" onClick={handleSubmitPost}>
                                Post
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <Typography variant="subtitle2" sx={{ mt: theme.spacing(0.5) }}>
                    * Required
                </Typography>
            </Container>
        </Box>
    );
};

export default NewPost;
