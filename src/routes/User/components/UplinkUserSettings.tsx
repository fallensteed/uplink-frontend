import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useSnack from "common/components/SnackBar/ProvideSnack";
import { convertGradeToRank } from "common/functions/rank";
import { FC, useEffect, useState } from "react";
import { UplinkUser, uplink_user_patch } from "routes/Uplink/api/user/uplink_user.api";
import { useUser } from "../../../common/context/User/UserContext";

const UplinkUserSettings: FC = () => {
    const snack = useSnack();
    const theme = useTheme();
    const user = useUser();

    const [verificationStatus, setVerificationStatus] = useState<string>(user.uplink.verificationStatus);
    const [openVerificationDialog, setOpenVerificationDialog] = useState<boolean>(false);
    const [defaultDisplay, setDefaultDisplay] = useState<"username" | "verified">(user.uplink.default);
    const [editDefaultDisplay, setEditDefaultDisplay] = useState<boolean>(false);
    const [displayName, setDisplayName] = useState<string | null>(user.uplink.displayName || "");

    const handleSubmitVerificationRequest = async () => {
        const data: UplinkUser = {
            _id: user.uplink._id,
            verificationStatus: "requested",
            displayName: `${convertGradeToRank(user.profile.affiliation, user.profile.rank, "short")} ${
                user.profile.firstName
            } ${user.profile.lastName}`,
        } as UplinkUser;
        const response = await uplink_user_patch(data);
        if (response.data.modifiedCount === 1) {
            snack("success", "Request for Verification Submitted.");
            user.getUplinkUser();
            // setVerificationStatus("requested");
        } else {
            snack("error", "Something went wrong.");
        }
        setOpenVerificationDialog(false);
    };

    const handleChangeDefaultDisplay = async () => {
        const data: UplinkUser = {
            _id: user.uplink._id,
            default: defaultDisplay,
        } as UplinkUser;
        const response = await uplink_user_patch(data);
        if (response.data.modifiedCount === 1) {
            snack("success", "Successfully changed.");
            setEditDefaultDisplay(false);
            user.getUplinkUser();
        } else {
            snack("error", "Something went wrong.");
        }
    };

    useEffect(() => {
        setVerificationStatus(user.uplink.verificationStatus);
        setDefaultDisplay(user.uplink.default);
        setDisplayName(user.uplink.displayName || "");
    }, [user.uplink]);

    const displayVerificationStatus = () => {
        if (verificationStatus === "requested") {
            return (
                <>
                    <Typography variant="body1" color="blue">
                        Requested
                    </Typography>
                </>
            );
        } else if (verificationStatus === "verified") {
            return (
                <>
                    <Typography variant="body1" color="green">
                        Verified
                    </Typography>
                </>
            );
        } else {
            return (
                <>
                    <Typography variant="body1" color="error">
                        Not Requested
                    </Typography>
                    <FormControlLabel
                        control={<Checkbox onClick={() => setOpenVerificationDialog(true)} />}
                        label="Request Verification"
                        labelPlacement="start"
                    />
                </>
            );
        }
    };

    return (
        <Paper sx={{ p: theme.spacing(1), mt: theme.spacing(1) }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
                Uplink
            </Typography>
            <Typography variant="body2">Verify Account</Typography>
            <Container
                sx={{
                    display: "flex",
                    flexFlow: "row wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: theme.spacing(1),
                }}
            >
                {displayVerificationStatus()}
            </Container>
            <Typography variant="body2">Default User Display</Typography>
            {editDefaultDisplay ? (
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <FormControl variant="filled" size="small" hiddenLabel fullWidth>
                        <Select
                            onChange={(e) => setDefaultDisplay(e.target.value as "username" | "verified")}
                            value={defaultDisplay}
                            data-testid="select-default-display"
                        >
                            <MenuItem value="username">Uplink Username</MenuItem>
                            <MenuItem value="verified" disabled={Boolean(verificationStatus !== "verified")}>
                                Verified Account
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ mt: theme.spacing(1), mb: theme.spacing(1) }}>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ mr: theme.spacing(1) }}
                            onClick={() => setEditDefaultDisplay(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleChangeDefaultDisplay}>
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
                    <Typography variant="body1">
                        {defaultDisplay === "username" ? "Uplink Username" : "Verified Display Name"}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setEditDefaultDisplay(true);
                        }}
                        data-testid="edit-default-display"
                    >
                        <EditIcon />
                    </IconButton>
                </Container>
            )}
            <Typography variant="body2">Verified Display Name</Typography>
            <Container sx={{ mb: theme.spacing(1) }}>
                <Typography variant="body1">{displayName}</Typography>
            </Container>
            <Dialog
                id="verification-confirm"
                open={openVerificationDialog}
                onClose={() => setOpenVerificationDialog(false)}
                data-testid="verification-dialog"
            >
                <DialogTitle>Are you sure you want to verify your account?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Verifying your account will allow users to see your name, rank, and office. You can still post
                        as your Uplink Username but it will be linked back to your personal data. This can be undone in
                        the future but other users may still be able to connect the information.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenVerificationDialog(false)} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmitVerificationRequest}>
                        Submit for Verification
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default UplinkUserSettings;
