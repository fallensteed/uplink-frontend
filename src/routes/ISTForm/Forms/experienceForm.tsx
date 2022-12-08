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

export default function ExperienceForm() {
    const [relatedJob, setRelatedJob] = useState("");
    const [relatedJobCode, setRelatedJobCode] = useState("");
    const [jobCode, setJobCode] = useState("");
    const [currentJobTitle, setCurrentJobTitle] = useState("");
    const [previousJobTitle, setPreviousJobTitle] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [degreeName, setDegreeName] = useState("");
    const [highestPME, setHighestPME] = useState("");

    const handleChangeRelatedJob = (e: SelectChangeEvent<string>) => {
        setRelatedJob(e.target.value);
    };

    const handleChangeRelatedJobCode = (e: SelectChangeEvent<string>) => {
        setRelatedJobCode(e.target.value);
    };

    const handleChangeJobCode = (e: ChangeEvent<HTMLInputElement>) => {
        setJobCode(e.target.value);
    };

    const handleChangeCurrentJobTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentJobTitle(e.target.value);
    };

    const handleChangePreviousJobTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setPreviousJobTitle(e.target.value);
    };

    const handleChangeEducationLevel = (e: SelectChangeEvent<string>) => {
        setEducationLevel(e.target.value);
    };

    const handleChangeDegreeName = (e: ChangeEvent<HTMLInputElement>) => {
        setDegreeName(e.target.value);
    };

    const handleChangeHighestPME = (e: ChangeEvent<HTMLInputElement>) => {
        setHighestPME(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h6" align="center">
                Previous Experience
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-select-small">Is your current job related to a USSF Job? </InputLabel>
                        <Select labelId="demo-select-small" value={relatedJob} onChange={handleChangeRelatedJob}>
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl fullWidth variant="filled" required={relatedJob === "yes"}>
                        <InputLabel id="demo-simple-select-label">If yes, select your job code</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={relatedJobCode}
                            label="Ethnicity"
                            onChange={handleChangeRelatedJobCode}
                        >
                            <MenuItem value="3d0x2">3d0x2</MenuItem>
                            <MenuItem value="3d0x1">3d0x1</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="jobCode"
                        label="If no, what is your job code?"
                        defaultValue={jobCode}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeJobCode}
                        required={relatedJob === "no"}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="currentJobTitle"
                        label="Current Job Title"
                        defaultValue={currentJobTitle}
                        required
                        fullWidth
                        variant="filled"
                        onChange={handleChangeCurrentJobTitle}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="previousJobTitle"
                        label="Previous Job Title"
                        defaultValue={previousJobTitle}
                        fullWidth
                        variant="filled"
                        onChange={handleChangePreviousJobTitle}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <FormControl required fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-label">Highest Education Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={educationLevel}
                            label="Highest Education Level"
                            onChange={handleChangeEducationLevel}
                        >
                            <MenuItem value="highSchoolDiploma">High School Diploma</MenuItem>
                            <MenuItem value="someCollege">Some College</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="degreeName"
                        label="Degree Name"
                        defaultValue={degreeName}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeDegreeName}
                        required={educationLevel !== "highSchoolDiploma"}
                    />
                </Grid>
                <Grid xs={12} md={6}>
                    <TextField
                        name="highestPME"
                        label="Highest Profressional Military Education"
                        defaultValue={highestPME}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeHighestPME}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
