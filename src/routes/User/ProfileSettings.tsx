import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUser } from "common/context/User/UserContext";
import { FC, useState } from "react";
import { User, user_patchByUserId } from "../../common/api/user/user.api";
import useSnack from "../../common/components/SnackBar/ProvideSnack";
import UplinkUserSettings from "./components/UplinkUserSettings";

const ProfileSettings: FC = () => {
    const snack = useSnack();
    const theme = useTheme();
    const user = useUser();
    const [editUplinkUsername, setEditUplinkUsername] = useState<boolean>(false);
    const [newUplinkUsername, setNewUplinkUsername] = useState<string>(user.profile.uplinkUsername as string);
    const [editAlias, setEditAlias] = useState<boolean>(false);
    const [newAlias, setNewAlias] = useState<string>(user.profile.alias as string);

    const handleSaveUplinkUsernameChange = async () => {
        const data = {
            _id: user.profile._id,
            uplinkUsername: newUplinkUsername,
        } as User;
        const response = await user_patchByUserId(data);
        if (response.data && response.data.modifiedCount === 1) {
            user.getUserProfile();
            snack("success", "Profile Successfully Updated");
            setEditUplinkUsername(false);
        } else {
            snack("error", "Something went wrong.");
        }
    };

    const handleSaveAliasChange = async () => {
        const data = {
            _id: user.profile._id,
            alias: newAlias,
        } as User;
        const response = await user_patchByUserId(data);
        if (response.data && response.data.modifiedCount === 1) {
            user.getUserProfile();
            snack("success", "Profile Successfully Updated");
            setEditAlias(false);
        } else {
            snack("error", `Something went wrong.`);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ display: "flex", flexFlow: "row wrap" }}>
            <Container maxWidth="sm" sx={{ mt: theme.spacing(2) }}>
                <Typography variant="h2">Your Profile</Typography>
                <Paper sx={{ p: theme.spacing(1), mt: theme.spacing(1) }}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Editable Profile Values
                    </Typography>
                    <Typography variant="body2">Uplink Username</Typography>
                    {editUplinkUsername ? (
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            <TextField
                                hiddenLabel
                                fullWidth
                                size="small"
                                variant="filled"
                                value={newUplinkUsername}
                                onChange={(e) => setNewUplinkUsername(e.target.value)}
                            />
                            <Box sx={{ mt: theme.spacing(1), mb: theme.spacing(1) }}>
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
                        </Container>
                    ) : (
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="body1">u/{user.profile.uplinkUsername}</Typography>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setEditUplinkUsername(true);
                                    setNewUplinkUsername(user.profile.uplinkUsername);
                                }}
                                data-testid="edit-username"
                            >
                                <EditIcon />
                            </IconButton>
                        </Container>
                    )}
                    <Typography variant="body2">Alias/Call-Sign</Typography>
                    {editAlias ? (
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-end",
                            }}
                        >
                            <TextField
                                hiddenLabel
                                fullWidth
                                size="small"
                                variant="filled"
                                value={newAlias}
                                onChange={(e) => setNewAlias(e.target.value)}
                            />
                            <Box sx={{ mt: theme.spacing(1), mb: theme.spacing(1) }}>
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
                        </Container>
                    ) : (
                        <Container
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="body1">{user.profile.alias}</Typography>
                            <IconButton
                                size="small"
                                data-testid="edit-alias"
                                onClick={() => {
                                    setEditAlias(true);
                                    setNewAlias(user.profile.alias || "");
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Container>
                    )}
                </Paper>
                <Paper sx={{ p: theme.spacing(1), mt: theme.spacing(1) }}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        Login Associated Information
                    </Typography>

                    <Typography variant="body2">Platform One Username</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.p1Username}
                        </Typography>
                    </Container>
                    <Typography variant="body2">First Name</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.firstName}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Middle Initial</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.middleInitial || "N/A"}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Last Name</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.lastName}
                        </Typography>
                    </Container>
                    <Typography variant="body2">DoD ID Number</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.dodin}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Official Email</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.email}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Affiliation</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.affiliation}
                        </Typography>
                    </Container>
                    <Typography variant="body2">Rank</Typography>
                    <Container>
                        <Typography variant="body1" sx={{ py: theme.spacing(0.5) }}>
                            {user.profile.rank}
                        </Typography>
                    </Container>
                </Paper>
            </Container>
            <Container maxWidth="sm" sx={{ mt: theme.spacing(2) }}>
                <Typography variant="h2">Settings</Typography>
                <UplinkUserSettings />
            </Container>
        </Container>
    );
};

export default ProfileSettings;
