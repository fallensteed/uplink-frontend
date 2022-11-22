import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

export default function PersonalForm(props: any) {
    const {
        formField: { firstName, middleName, lastName, dateOfBirth, race, ethnicity },
    } = props;

    const [gender, setGender] = useState("");

    const handleChangeGender = (event: SelectChangeEvent<string>) => {
        setGender(event.target.value);
    };
    return (
        <Container>
            <Typography variant="h6" align="center">
                Personal Data
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <TextField name={firstName.name} label={firstName.label} required fullWidth />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField name={middleName.name} label={middleName.label} fullWidth />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField name={lastName.name} label={lastName.label} required fullWidth variant="filled" />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField name={dateOfBirth.name} label={dateOfBirth.label} required fullWidth />
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth>
                        <InputLabel id="demo-select-small">Gender</InputLabel>
                        <Select labelId="demo-select-small" value={gender} label="Gender" onChange={handleChangeGender}>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-label">Race</InputLabel>
                        <Select labelId="demo-simple-select-label" value={race} label="Race">
                            <MenuItem value="white">White</MenuItem>
                            <MenuItem value="black">Black</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl required fullWidth>
                        <InputLabel>Ethinicity</InputLabel>
                        <Select value={ethnicity} label="Ethnicity">
                            <MenuItem value="hispanic">Hispanic or Latino</MenuItem>
                            <MenuItem value="notHispanic">Not Hispanic or Latino</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}
