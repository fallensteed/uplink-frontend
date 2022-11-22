import { Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";

export default function PersonalForm(props: any) {
    const {
        formField: { firstName, middleName, lastName, dateOfBirth, gender, race, ethnicity },
    } = props;
    return (
        <React.Fragment>
            <Typography variant="h6">Personal Data</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField name={firstName.name} label={firstName.label} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name={middleName.name} label={middleName.label} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name={lastName.name} label={lastName.label} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name={dateOfBirth.name} label={dateOfBirth.label} />
                </Grid>
                <InputLabel id="demo-select-small">Gender</InputLabel>
                <Select labelId="demo-select-small" id="demo-select-small" value={gender} label="Gender">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
                <InputLabel>Race</InputLabel>
                <Select value={race} label="Race">
                    <MenuItem value="white">White</MenuItem>
                    <MenuItem value="black">Black</MenuItem>
                </Select>
                <InputLabel>Ethinicity</InputLabel>
                <Select value={ethnicity} label="Ethnicity">
                    <MenuItem value="hispanic">Hispanic or Latino</MenuItem>
                    <MenuItem value="notHispanic">Not Hispanic or Latino</MenuItem>
                </Select>
            </Grid>
        </React.Fragment>
    );
}
