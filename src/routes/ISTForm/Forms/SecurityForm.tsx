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
    const [grade, setGrade] = useState("");
    const [service, setService] = useState("");
    const [rank, setRank] = useState("");
    const [dateOfRank, setDateOfRank] = useState("");
    const [totalActiveFederalMilitaryServiceDate, setTotalActiveFederalMilitaryServiceDate] = useState("");
    const [activeDutyServiceCommitmentDate, setActiveDutyServiceCommitmentDate] = useState("");
    const [totalActiveFederalCommissionedServiceDate, setTotalActiveFederalCommissionedServiceDate] = useState("");
    const [sourceOfCommission, setSourceOfCommission] = useState("");
    const [securityClearance, setSecurityClearance] = useState("");
    const [dodId, setDodID] = useState("");
    const [socialSecurityNumber, setSocialSecurityNumber] = useState("");

    const handleChangeGrade = (e: SelectChangeEvent<string>) => {
        setGrade(e.target.value);
    };

    const handleChangeService = (e: SelectChangeEvent<string>) => {
        setService(e.target.value);
    };

    const handleChangeRank = (e: SelectChangeEvent<string>) => {
        setRank(e.target.value);
    };

    const handleChangeDateOfRank = (e: ChangeEvent<HTMLInputElement>) => {
        setDateOfRank(e.target.value);
    };

    const handleChangeTotalActiveFederalMilitaryServiceDate = (e: ChangeEvent<HTMLInputElement>) => {
        setTotalActiveFederalMilitaryServiceDate(e.target.value);
    };

    const handleChangeActiveDutyServiceCommitmentDate = (e: ChangeEvent<HTMLInputElement>) => {
        setActiveDutyServiceCommitmentDate(e.target.value);
    };

    const handleChangeTotalActiveFederalCommissionedServiceDate = (e: ChangeEvent<HTMLInputElement>) => {
        setTotalActiveFederalCommissionedServiceDate(e.target.value);
    };

    const handleChangeSourceOfCommission = (e: ChangeEvent<HTMLInputElement>) => {
        setSourceOfCommission(e.target.value);
    };

    const handleChangeSecurityClearance = (e: SelectChangeEvent<string>) => {
        setSecurityClearance(e.target.value);
    };

    const handleChangeDodId = (e: ChangeEvent<HTMLInputElement>) => {
        setDodID(e.target.value);
    };

    const handleChangeSocialSecurityNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setSocialSecurityNumber(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Security Information
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">Grade</InputLabel>
                        <Select labelId="demo-select-small" value={grade} onChange={handleChangeGrade}>
                            <MenuItem value="e1">E1</MenuItem>
                            <MenuItem value="e2">E2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">Service</InputLabel>
                        <Select labelId="demo-select-small" value={service} onChange={handleChangeService}>
                            <MenuItem value="airForce">Air Force</MenuItem>
                            <MenuItem value="navy">Navy</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">Rank</InputLabel>
                        <Select labelId="demo-select-small" value={rank} onChange={handleChangeRank}>
                            <MenuItem value="airmanBasic">Airman Basic</MenuItem>
                            <MenuItem value="airman">Airman</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="dateOfRank"
                        label="Date Of Rank"
                        defaultValue={dateOfRank}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeDateOfRank}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="totalActiveFederalMilitaryServiceDate"
                        label="Total Active Federal Military Service Date"
                        defaultValue={totalActiveFederalMilitaryServiceDate}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeTotalActiveFederalMilitaryServiceDate}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="activeDutyServiceCommitmentDate"
                        label="Active Duty Service Commitment Date"
                        defaultValue={activeDutyServiceCommitmentDate}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeActiveDutyServiceCommitmentDate}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="totalActiveFederalCommissionedServiceDate"
                        label="Total Active Federal Commissioned Service Date"
                        defaultValue={totalActiveFederalCommissionedServiceDate}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeTotalActiveFederalCommissionedServiceDate}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="sourceOfCommission"
                        label="Source Of Commission"
                        defaultValue={sourceOfCommission}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeSourceOfCommission}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">Security Clearance</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            value={securityClearance}
                            onChange={handleChangeSecurityClearance}
                        >
                            <MenuItem value="Secret">Secret</MenuItem>
                            <MenuItem value="Top Secret">Top Secret</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="dodID"
                        label="DOD ID"
                        defaultValue={dodId}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeDodId}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="socialSecurityNumber"
                        label="Social Security Number"
                        defaultValue={socialSecurityNumber}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeSocialSecurityNumber}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
