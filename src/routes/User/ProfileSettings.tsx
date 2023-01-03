import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, useContext, useState } from "react";
import { User, user_patchByUserId } from "../../common/api/user/user.api";
import useSnack from "../../common/components/SnackBar/ProvideSnack";
import { UserContext } from "../Root";
import UplinkUserSettings from "./components/UplinkUserSettings";

const ProfileSettings: FC = () => {
    const snack = useSnack();
    const theme = useTheme();
    const user = useContext(UserContext);
    const [editUplinkUsername, setEditUplinkUsername] = useState<boolean>(false);
    const [newUplinkUsername, setNewUplinkUsername] = useState<string>(user?.uplinkUsername as string);
    const [editAlias, setEditAlias] = useState<boolean>(false);
    const [newAlias, setNewAlias] = useState<string>(user?.alias as string);

    const handleSaveUplinkUsernameChange = async () => {
        const data = {
            _id: user?._id,
            uplinkUsername: newUplinkUsername,
        } as User;
        const response = await user_patchByUserId(data);
        if (response.data.modifiedCount === 1) {
            snack("success", "Profile Successfully Updated");
            setEditUplinkUsername(false);
        } else {
            snack("error", `Error: ${response.message}`);
        }
    };

    const handleSaveAliasChange = async () => {
        const data = {
            _id: user?._id,
            alias: newAlias,
        } as User;
        const response = await user_patchByUserId(data);
        if (response.data.modifiedCount === 1) {
            snack("success", "Profile Successfully Updated");
            setEditAlias(false);
        } else {
            snack("error", `Error: ${response.message}`);
        }
    };

    return user ? (
        <Container maxWidth="lg" sx={{ display: "flex", flexFlow: "row wrap" }}>
            <Container maxWidth="sm" sx={{ mt: theme.spacing(2) }}>
                <Typography variant="h2">Your Profile</Typography>
                <Paper sx={{ p: theme.spacing(1), mt: theme.spacing(1) }}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Editable Profile Values
                    </Typography>
                    <Typography variant="body2">Uplink Username</Typography>
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {editUplinkUsername ? (
                            <>
                                <TextField
                                    hiddenLabel
                                    size="small"
                                    variant="filled"
                                    value={newUplinkUsername}
                                    onChange={(e) => setNewUplinkUsername(e.target.value)}
                                />
                                <Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ mr: theme.spacing(1) }}
                                        onClick={() => setEditUplinkUsername(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="contained" onClick={handleSaveUplinkUsernameChange}>
                                        Save
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1">u/{user?.uplinkUsername}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        setEditUplinkUsername(true);
                                        setNewUplinkUsername(user.uplinkUsername);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Container>
                    <Typography variant="body2">Alias/Call-Sign</Typography>
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {editAlias ? (
                            <>
                                <TextField
                                    hiddenLabel
                                    size="small"
                                    variant="filled"
                                    value={newAlias}
                                    onChange={(e) => setNewAlias(e.target.value)}
                                />
                                <Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ mr: theme.spacing(1) }}
                                        onClick={() => setEditAlias(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="contained" onClick={handleSaveAliasChange}>
                                        Save
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1">{user?.alias}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        setEditAlias(true);
                                        setNewAlias(user?.alias || "");
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Container>
                </Paper>
                <Paper sx={{ p: theme.spacing(1), mt: theme.spacing(1) }}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Login Associated Information
                    </Typography>

                    <Typography variant="body2">Platform One Username</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.p1Username}
                        </Typography>
                    </Container>
                    <Typography variant="body2">First Name</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.firstName}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Middle Initial</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.middleInitial || "N/A"}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Last Name</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.lastName}
                        </Typography>
                    </Container>
                    <Typography variant="body2">DoD ID Number</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.dodin}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Official Email</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.email}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Affiliation</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.affiliation}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Rank</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user?.rank}
                        </Typography>
                    </Container>
                </Paper>
            </Container>
            <Container maxWidth="sm" sx={{ mt: theme.spacing(2) }}>
                <Typography variant="h2">Settings</Typography>
                <UplinkUserSettings />
            </Container>
        </Container>
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

export default ProfileSettings;
