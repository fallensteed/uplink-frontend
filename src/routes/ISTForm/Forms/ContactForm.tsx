import { Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeEvent, useState } from "react";

export default function PersonalForm() {
    const [comPhone, setComPhone] = useState("");
    const [dsnPhone, setDSNPhone] = useState("");
    const [officialEmail, setOfficialEmail] = useState("");
    const [personalEmail, setPersonalEmail] = useState("");

    const handleChangeComPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setComPhone(e.target.value);
    };

    const handleChangeDSNPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setDSNPhone(e.target.value);
    };

    const handleChangeOfficialEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setOfficialEmail(e.target.value);
    };

    const handleChangePersonalEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setPersonalEmail(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Contact Data
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <TextField
                        name="ComPhone"
                        label="Commercial Phone"
                        defaultValue={comPhone}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeComPhone}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="dsnPhone"
                        label="DSN Phone"
                        defaultValue={dsnPhone}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeDSNPhone}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="officialEmail"
                        label="Official Email"
                        defaultValue={officialEmail}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeOfficialEmail}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="personalEmail"
                        label="Personal Email"
                        defaultValue={personalEmail}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangePersonalEmail}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
