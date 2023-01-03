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
    const [streetOne, setStreetOne] = useState("");
    const [streetTwo, setStreetTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

    const handleChangeStreetOne = (e: ChangeEvent<HTMLInputElement>) => {
        setStreetOne(e.target.value);
    };

    const handleChangeStreetTwo = (e: ChangeEvent<HTMLInputElement>) => {
        setStreetTwo(e.target.value);
    };

    const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleChangeState = (e: SelectChangeEvent<string>) => {
        setState(e.target.value);
    };

    const handleChangeZipCode = (e: ChangeEvent<HTMLInputElement>) => {
        setZipCode(e.target.value);
    };

    const handleChangeCountry = (e: SelectChangeEvent<string>) => {
        setCountry(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Address Form
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <TextField
                        name="streetone"
                        label="Street 1"
                        defaultValue={streetOne}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeStreetOne}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="streettwo"
                        label="Street 2"
                        defaultValue={streetTwo}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeStreetTwo}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="city"
                        label="City"
                        defaultValue={city}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCity}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={state}
                            label="State"
                            onChange={handleChangeState}
                        >
                            <MenuItem value="tx">TX</MenuItem>
                            <MenuItem value="ca">CA</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="zipCode"
                        label="Zip Code"
                        defaultValue={zipCode}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeZipCode}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={country}
                            label="Country"
                            onChange={handleChangeCountry}
                        >
                            <MenuItem value="japan">Japan</MenuItem>
                            <MenuItem value="unitedStates">United States of America</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
}
