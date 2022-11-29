import { Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeEvent, useState } from "react";

export default function PersonalForm() {
    const [currentUnitName, setCurrentUnitName] = useState("");
    const [currentUnitLocation, setCurrentUnitLocation] = useState("");
    const [commanderName, setCommanderName] = useState("");
    const [commanderComPhone, setCommanderComPhone] = useState("");
    const [commanderDSNPhone, setCommanderDSNPhone] = useState("");
    const [commanderEmail, setCommanderEmail] = useState("");

    const handleChangeCurrentUnitName = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentUnitName(e.target.value);
    };

    const handleChangeCurrentUnitLocation = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentUnitLocation(e.target.value);
    };

    const handleChangeCommanderName = (e: ChangeEvent<HTMLInputElement>) => {
        setCommanderName(e.target.value);
    };

    const handleChangeCommanderComPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setCommanderComPhone(e.target.value);
    };

    const handleChangeCommanderDSNPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setCommanderDSNPhone(e.target.value);
    };

    const handleChangeCommanderEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setCommanderEmail(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Current Unit Information
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <TextField
                        name="currentUnitName"
                        label="Current Unit Name"
                        defaultValue={currentUnitName}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCurrentUnitName}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="currentUnitLocation"
                        label="Current Unit Location"
                        defaultValue={currentUnitLocation}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCurrentUnitLocation}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="commanderName"
                        label="Commander Name"
                        defaultValue={commanderName}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCommanderName}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="commanderComPhone"
                        label="Commander Commercial Phone"
                        defaultValue={commanderComPhone}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCommanderComPhone}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="commanderDSNPhone"
                        label="Commander DSN Phone"
                        defaultValue={commanderDSNPhone}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCommanderDSNPhone}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="commanderEmail"
                        label="Commander Email"
                        defaultValue={commanderEmail}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCommanderEmail}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
