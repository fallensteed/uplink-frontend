import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function PersonalForm() {
    return (
        <React.Fragment>
            <Typography variant="h6">Personal Data</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField name="firstName" label="First Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="middleName" label="Middle Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="lastName" label="Last Name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="dateOfBirth" label="Date Of Birth" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="gender" label="Gender" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="race" label="Race" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
