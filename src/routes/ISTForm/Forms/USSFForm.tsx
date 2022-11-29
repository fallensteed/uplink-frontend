import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

export default function USSFForm() {
    const [jobOne, setJobOne] = useState("");
    const [jobTwo, setJobTwo] = useState("");
    const [jobThree, setJobThree] = useState("");

    const handleChangeJobOne = (e: SelectChangeEvent<string>) => {
        setJobOne(e.target.value);
    };

    const handleChangeJobTwo = (e: SelectChangeEvent<string>) => {
        setJobTwo(e.target.value);
    };

    const handleChangeJobThree = (e: SelectChangeEvent<string>) => {
        setJobThree(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                USSF Preferences
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">1st Preferred Job</InputLabel>
                        <Select labelId="demo-select-small" value={jobOne} onChange={handleChangeJobOne}>
                            <MenuItem value="geospatialIntelligence">Geospatial Intelligence</MenuItem>
                            <MenuItem value="targetingAnalyst">Targeting Analyst</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">2nd Preferred Job</InputLabel>
                        <Select labelId="demo-select-small" value={jobTwo} onChange={handleChangeJobTwo}>
                            <MenuItem value="geospatialIntelligence">Geospatial Intelligence</MenuItem>
                            <MenuItem value="targetingAnalyst">Targeting Analyst</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">3rd Preferred Job</InputLabel>
                        <Select labelId="demo-select-small" value={jobThree} onChange={handleChangeJobThree}>
                            <MenuItem value="geospatialIntelligence">Geospatial Intelligence</MenuItem>
                            <MenuItem value="targetingAnalyst">Targeting Analyst</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}
