import {
    Alert,
    AlertColor,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "routes/Root";
import { Community, community_getAllByUserId, community_getByIdOrLink } from "../api/community/community.api";
import { Post, post_postOne } from "../api/post/post.api";

const NewPost: FC = () => {
    const theme = useTheme();
    const user = useContext(UserContext);
    const { communityLink } = useParams();
    const navigate = useNavigate();
    const [community, setCommunity] = useState<Community | null>(null);
    const [communityId, setCommunityId] = useState<string | null>(null);
    const [memberCommunities, setMemberCommunities] = useState<Community[] | null>(null);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor>();
    const [postTitle, setPostTitle] = useState<string>("");
    const [postText, setPostText] = useState<string>("");
    const [postLink, setPostLink] = useState<string>("");
    const [postImage, setPostImage] = useState<string>("");
    const [postNotifications, setPostNotifications] = useState<boolean>(true);

    const getCommunityData = async (link: string) => {
        const response = await community_getByIdOrLink(link);
        if (response.data) setCommunity(response.data as Community);
    };

    const getMemberCommunities = async () => {
        if (user) {
            const response = await community_getAllByUserId(user._id);
            if (response.data) setMemberCommunities(response.data);
        }
    };

    const handleCommunityChange = (event: SelectChangeEvent) => {
        setCommunityId(event.target.value);
    };

    useEffect(() => {
        if (communityLink) getCommunityData(communityLink);
    }, [communityLink]);

    useEffect(() => {
        getMemberCommunities();
    }, [user]);

    const handleSubmitPost = async () => {
        if (!communityId) {
            setSnackBarMessage("Select a Community");
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
            return;
        }
        if (!postTitle) {
            setSnackBarMessage("Post Title Needed");
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
            return;
        }
        if (!postText) {
            setSnackBarMessage("Post Text Needed");
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
            return;
        }
        const data: Post = {} as Post;
        data["community"] = communityId;
        data["title"] = postTitle;
        data["detail"] = postText;
        if (postLink) data["link"] = postLink;
        if (postImage) data["imageSrc"] = postImage;
        data["draft"] = false;
        data["userCreated"] = user?._id as string;
        data["userCreatedNotifications"] = postNotifications;
        const response = await post_postOne(data);
        if (response.data.miniLink) {
            setSnackBarMessage("Your Post has been created!");
            setSnackBarSeverity("success");
            setSnackBarOpen(true);
            navigate(`/c/${communityLink}/p/${response.data.miniLink}`);
        } else {
            setSnackBarMessage(`I think something went wrong`);
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Create a Post</Typography>
            <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} md={6}>
                        <FormControl fullWidth variant="filled" size="small">
                            <InputLabel id="community-select-label">Select a Community</InputLabel>
                            <Select
                                labelId="community-select-label"
                                id="community-select"
                                value={"" || (communityId as string)}
                                onChange={handleCommunityChange}
                            >
                                {memberCommunities ? (
                                    memberCommunities.map((comm) => (
                                        <MenuItem key={comm._id} value={comm._id}>
                                            c/{comm.link}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No Communities Available</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={12} md={6}></Grid2>
                </Grid2>
            </Paper>
            <Paper sx={{ p: theme.spacing(1) }}>
                <TextField
                    label="Title"
                    variant="filled"
                    fullWidth
                    size="small"
                    margin="dense"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <TextField
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
                    label="Link URL (optional)"
                    variant="filled"
                    fullWidth
                    size="small"
                    margin="dense"
                    value={postLink}
                    onChange={(e) => setPostLink(e.target.value)}
                />
                <TextField
                    label="Image URL (optional)"
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
                    <Box>
                        <Button color="error" sx={{ mr: theme.spacing(1) }}>
                            Cancel
                        </Button>
                        <Button variant="outlined" sx={{ mr: theme.spacing(1) }}>
                            Save Draft
                        </Button>
                        <Button variant="contained" onClick={handleSubmitPost}>
                            Post
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                <Alert onClose={() => setSnackBarOpen(false)} severity={snackBarSeverity}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewPost;
