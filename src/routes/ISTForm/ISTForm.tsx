import { Box, Typography } from "@mui/material";
import { FC } from "react";

const item = {
    margin: "10px",
    padding: "5px",
};

const input = {
    marginTop: "2px",
};

const ISTForm: FC = () => {
    return (
        <>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "425563",
                    color: "white",
                }}
            >
                <Typography variant="h2">IST Application</Typography>
                <Typography variant="body1" sx={{ pb: 2 }}>
                    <form>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>First Name</Typography>
                                <input style={input} type="text" />
                            </label>
                            <label style={item}>
                                <Typography>Middle Name</Typography>
                                <input style={input} type="text" />
                            </label>
                            <label style={item}>
                                <Typography>Last Name</Typography>
                                <input style={input} type="text" />
                            </label>
                            <label style={item}>
                                <Typography>Grade</Typography>
                                <select style={input}>
                                    <option value="E1">E1</option>
                                    <option value="E2">E2</option>
                                    <option value="E3">E3</option>
                                    <option value="E4">E4</option>
                                    <option value="E5">E5</option>
                                    <option value="E6">E6</option>
                                    <option value="E7">E7</option>
                                    <option value="E8">E8</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Service</Typography>
                                <select style={input}>
                                    <option value="Air Force">Air Force</option>
                                    <option value="Navy">Navy</option>
                                    <option value="Marines">Marines</option>
                                    <option value="Army">Army</option>
                                    <option value="Coast Guard">Coast Guard</option>
                                </select>
                            </label>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>Rank</Typography>
                                <select style={input}>
                                    <option value="Airman Basic">Airman Basic</option>
                                    <option value="Airman">Airman</option>
                                    <option value="Airman 1st Class">Airman 1st Class</option>
                                    <option value="Staff Sergeant">Staff Sergeant</option>
                                    <option value="Technical Sergeant">Technical Sergeant</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Date of Rank</Typography>
                                <input type="text" style={input} />
                            </label>
                            <label style={item}>
                                <Typography>Total Active Federal Military Service Date</Typography>
                                <input type="text" style={input} />
                            </label>
                            <label style={item}>
                                <Typography>Active Duty Service Commitment Date</Typography>
                                <input type="text" style={input} />
                            </label>
                        </Box>
                    </form>
                </Typography>
            </Box>
        </>
    );
};

export default ISTForm;
