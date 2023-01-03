import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ChangeEvent, useState } from "react";

export default function PersonalForm() {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [race, setRace] = useState("");
    const [ethnicity, setEthnicity] = useState("");

    const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleChangeMiddleName = (e: ChangeEvent<HTMLInputElement>) => {
        setMiddleName(e.target.value);
    };

    const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleChangeDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
        setDateOfBirth(e.target.value);
    };

    const handleChangeGender = (e: SelectChangeEvent<string>) => {
        setGender(e.target.value);
    };

    const handleChangeRace = (e: SelectChangeEvent<string>) => {
        setRace(e.target.value);
    };

    const handleChangeEthnicity = (e: SelectChangeEvent<string>) => {
        setEthnicity(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Personal Data
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        defaultValue={firstName}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeFirstName}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="middleName"
                        label="Middle Name"
                        defaultValue={middleName}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeMiddleName}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="lastName"
                        label="Last Name"
                        defaultValue={lastName}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeLastName}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="dateOfBirth"
                        label="Date of Birth"
                        defaultValue={dateOfBirth}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeDateOfBirth}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
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
                        <Select
                            labelId="demo-simple-select-label"
                            value={race}
                            label="Race"
                            onChange={handleChangeRace}
                        >
                            <MenuItem value="white">White</MenuItem>
                            <MenuItem value="black">Black</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-label">Ethinicity</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={ethnicity}
                            label="Ethnicity"
                            onChange={handleChangeEthnicity}
                        >
                            <MenuItem value="hispanic">Hispanic or Latino</MenuItem>
                            <MenuItem value="notHispanic">Not Hispanic or Latino</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}
