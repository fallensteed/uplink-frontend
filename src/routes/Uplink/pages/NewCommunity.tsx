import AddIcon from "@mui/icons-material/Add";
import {
    Alert,
    AlertColor,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Paper,
    Snackbar,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeEvent, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Root";
import { Community, CommunityRule, community_postOne } from "../api/community/community.api";

const NewCommunity: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const [name, setName] = useState<string>("");
    const [nameChar, setNameChar] = useState<number>(0);
    const [about, setAbout] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [publicToggle, setPublicToggle] = useState<boolean>(true);
    const [requestOfficial, setRequestOfficial] = useState<boolean>(false);
    const [rules, setRules] = useState<CommunityRule[]>([]);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [snackBarSeverity, setSnackBarSeverity] = useState<AlertColor>();

    const correctString = (text: string) => {
        // eslint-disable-next-line no-useless-escape
        const regex = /[^A-Za-z0-9\-]/g;
        const regex2 = /[-]/g;
        const correctedString = text.replace(regex, "").replace(regex2, "_");
        return correctedString;
    };

    const communityNameAndLinkUpdate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let nameStr = event.target.value;
        nameStr = nameStr.slice(0, 30);
        const linkStr = correctString(nameStr);
        setName(nameStr);
        setLink(linkStr);
        setNameChar(nameStr.length);
    };

    const handleAddNewRule = () => {
        const updatedRules = [...rules];
        updatedRules.push({ name: "", detail: "", order: rules.length + 1 });
        setRules(updatedRules);
    };

    const handleUpdateRules = (index: number, fieldName: string, value: any) => {
        const updatedRules = [...rules];
        const ruleToUpdate = updatedRules[index];
        ruleToUpdate[fieldName] = value;
        updatedRules[index] = ruleToUpdate;
        setRules(updatedRules);
    };

    const handleSubmit = async () => {
        if (!name) {
            setSnackBarMessage("Enter a Community Name");
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
            return;
        }
        const data: Community = {} as Community;
        data["name"] = name;
        if (about) data["about"] = about;
        data["link"] = link;
        data["public"] = publicToggle;
        data["members"] = [user?._id as string];
        data["moderators"] = [user?._id as string];
        if (rules.length) data["rules"] = rules;
        const response = await community_postOne(data);
        if (response.data._id) {
            setSnackBarMessage("Your Community has been created!");
            setSnackBarSeverity("success");
            setSnackBarOpen(true);
            navigate(`/c/${link}`);
        } else {
            setSnackBarMessage(`I think something went wrong`);
            setSnackBarSeverity("error");
            setSnackBarOpen(true);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Create a Community</Typography>
            <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
                <Typography variant="h6">Community Creation Guidelines</Typography>
                <Typography variant="body1">
                    In creating a community, you agree to the following guidelines of community management:
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemText>
                            1. You will ensure that your community is moderated. Communities that are not moderated will
                            be taken down.
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            2. This community is not a parody of any official Community or purposefully confusing
                            towards any official Community.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>3. Community will only contain work appropriate content.</ListItemText>
                    </ListItem>
                </List>
            </Paper>
            <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} md={6}>
                        <TextField
                            required
                            label="Community Name"
                            variant="filled"
                            fullWidth
                            size="small"
                            margin="dense"
                            value={name}
                            onChange={(e) => communityNameAndLinkUpdate(e)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{nameChar}/30</InputAdornment>,
                            }}
                        />
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                        <TextField
                            label="Community Link"
                            variant="filled"
                            fullWidth
                            size="small"
                            margin="dense"
                            disabled
                            value={`c/${link}`}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            label="About this Community"
                            variant="filled"
                            fullWidth
                            size="small"
                            margin="dense"
                            value={about}
                            multiline={true}
                            minRows={5}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    required
                                    defaultChecked
                                    value={publicToggle}
                                    onChange={(e) => setPublicToggle(e.target.checked)}
                                />
                            }
                            label="Public Community"
                        />
                    </Grid2>
                    <Grid2 xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={requestOfficial}
                                    onChange={(e) => setRequestOfficial(e.target.checked)}
                                />
                            }
                            label="Request as Official Community"
                        />
                        <Typography variant="body2">
                            Select this if you are creating this Community for your organization.
                        </Typography>
                    </Grid2>
                </Grid2>
            </Paper>
            <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pb: theme.spacing(2),
                    }}
                >
                    <Typography variant="h6">Community Rules</Typography>
                    <Button onClick={handleAddNewRule}>
                        <AddIcon />
                    </Button>
                </Box>
                {rules.map((rule, index) => (
                    <Box key={index}>
                        <Grid2 container spacing={1}>
                            <Grid2 xs={12} md={1}>
                                <Typography variant="body1">{index + 1}.</Typography>
                            </Grid2>
                            <Grid2 xs={12} md={4}>
                                <TextField
                                    label="Rule Name"
                                    variant="filled"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    value={rule.name}
                                    onChange={(event) => handleUpdateRules(index, "name", event.target.value)}
                                />
                            </Grid2>
                            <Grid2 xs={12} md={7}>
                                <TextField
                                    label="Rule Detail"
                                    variant="filled"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    multiline={true}
                                    value={rule.detail}
                                    onChange={(event) => handleUpdateRules(index, "detail", event.target.value)}
                                />
                            </Grid2>
                        </Grid2>
                    </Box>
                ))}
            </Paper>
            <Box sx={{ width: "100%", mt: theme.spacing(1), display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                <Alert onClose={() => setSnackBarOpen(false)} severity={snackBarSeverity}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewCommunity;
