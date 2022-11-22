import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function PersonalForm() {
    return (
        <React.Fragment>
            <Typography variant="h6">Contact Data</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField name="ComPhone" label="Commercial Phone" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="dsnPhone" label="DSN Phone" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="officialEmail" label="Official Email" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="personalEmail" label="Personal Email" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
