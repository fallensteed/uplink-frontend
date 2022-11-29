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
import { ChangeEvent, useState } from "react";

export default function PersonalForm() {
    const [militarySpouse, setMilitarySpouse] = useState("");
    const [spouseApply, setSpouseApply] = useState("");
    const [spouseName, setSpouseName] = useState("");

    const handleChangeMilitarySpouse = (e: SelectChangeEvent<string>) => {
        setMilitarySpouse(e.target.value);
    };

    const handleChangeSpouseApply = (e: SelectChangeEvent<string>) => {
        setSpouseApply(e.target.value);
    };

    const handleChangeSpouseName = (e: ChangeEvent<HTMLInputElement>) => {
        setSpouseName(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Spouse Information
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">Are you married to a military member?</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            value={militarySpouse}
                            onChange={handleChangeMilitarySpouse}
                        >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl fullWidth variant="filled">
                        <InputLabel id="demo-select-small">If yes, is your spouse also applying to the USSF</InputLabel>
                        <Select labelId="demo-select-small" value={spouseApply} onChange={handleChangeSpouseApply}>
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="spouseName"
                        label="If yes, what is your spouses name"
                        defaultValue={spouseName}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeSpouseName}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
