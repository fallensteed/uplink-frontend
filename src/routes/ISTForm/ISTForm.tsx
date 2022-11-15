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
    let firstName;
    let middleName;
    let lastName;
    let grade;
    let Service;
    let rank;
    let dateOfRank;
    let TAFMSD;
    let ADSCD;
    let tadcsd;
    let sourceOfCommission;
    let RelatedJob;
    let jobCode;
    let currentJobTitle;
    let choiceOne;
    let choiceTwo;
    let choiceThree;
    let previousCareer;
    let HighestEd;
    let DegreeName;
    let highestPME;
    let securityClearance;
    let OfficialEmail;
    let PersonalEmail;
    let ComPhone;
    let DSNPhone;
    let dateOfBirth;
    let Gender;
    let race;
    let Ethnicity;
    let DODID;
    let SSN;
    let Street;
    let city;
    let State;
    let Zip;
    let Country;
    let Married;
    let spouse;
    let UnitName;
    let UnitLocation;
    let currentCommander;
    let CommanderComPhone;
    let CommanderDSNPhone;
    let commanderEmail;

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
                                <input type="text" style={input} name="FirstName" onChange={changeFirstName} />
                            </label>
                            <label style={item}>
                                <Typography>Middle Name</Typography>
                                <input type="text" style={input} name="MiddleName" onChange={changeLastName} />
                            </label>
                            <label style={item}>
                                <Typography>Last Name</Typography>
                                <input type="text" style={input} name="LastName" onChange={changeLastName} />
                            </label>
                            <label style={item}>
                                <Typography>Grade</Typography>
                                <select style={input} name="Grade" onChange={changeGrade}>
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
                                <select style={input} name="Service" onChange={changeService}>
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
                                <select style={input} name="Rank" onChange={changeRank}>
                                    <option value="Airman Basic">Airman Basic</option>
                                    <option value="Airman">Airman</option>
                                    <option value="Airman 1st Class">Airman 1st Class</option>
                                    <option value="Staff Sergeant">Staff Sergeant</option>
                                    <option value="Technical Sergeant">Technical Sergeant</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Date of Rank</Typography>
                                <input type="text" style={input} name="DoR" onChange={changeDateOfRank} />
                            </label>
                            <label style={item}>
                                <Typography>Total Active Federal Military Service Date</Typography>
                                <input type="text" style={input} name="TAFMSD" onChange={changeTAFMSD} />
                            </label>
                            <label style={item}>
                                <Typography>Active Duty Service Commitment Date</Typography>
                                <input type="text" style={input} name="ADSCD" onChange={changeADSCD} />
                            </label>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>Total Actice Federal Commissioned Service Date</Typography>
                                <input type="text" style={input} name="TAFCSD" onChange={changeTAFCSD} />
                            </label>
                            <label style={item}>
                                <Typography>Source of Commission</Typography>
                                <input
                                    type="text"
                                    style={input}
                                    name="CommissionSource"
                                    onChange={changeSourceOfCommission}
                                />
                            </label>
                            <label style={item}>
                                <Typography>Does your current job relate to a USSF Job</Typography>
                                <select style={input} name="RelatedJob" onChange={changeRelatedJob}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>If no, write job code and description</Typography>
                                <input type="text" style={input} name="NotRelatedJob" onChange={changeNotRelatedJob} />
                            </label>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>Current Job Title</Typography>
                                <input type="text" style={input} name="JobTitle" onChange={changeJobTitle} />
                            </label>
                            <label style={item}>
                                <Typography>1st Choice USSSF Job</Typography>
                                <select style={input} name="1stChoice" onChange={changeJobOne}>
                                    <option value="Geospatial Intelligence">
                                        (USSF, 5I1) - Geospatial Intelligence
                                    </option>
                                    <option value="Targeting Analyst">(USSF, 5I8) - Targeting Analyst</option>
                                    <option value="USSF, 5S">(USSF, 5S) - Space Systems Operations</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>2nd Choice USSSF Job</Typography>
                                <select style={input} name="2ndChoice" onChange={changeJobTwo}>
                                    <option value="Geospatial Intelligence">
                                        (USSF, 5I1) - Geospatial Intelligence
                                    </option>
                                    <option value="Targeting Analyst">(USSF, 5I8) - Targeting Analyst</option>
                                    <option value="USSF, 5S">(USSF, 5S) - Space Systems Operations</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>3rd Choice USSSF Job</Typography>
                                <select style={input} name="3rdChoice" onChange={changeJobThree}>
                                    <option value="Geospatial Intelligence">
                                        (USSF, 5I1) - Geospatial Intelligence
                                    </option>
                                    <option value="Targeting Analyst">(USSF, 5I8) - Targeting Analyst</option>
                                    <option value="USSF, 5S">(USSF, 5S) - Space Systems Operations</option>
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
                                <Typography>Previous Career Field</Typography>
                                <input type="text" style={input} name="Previous" onChange={changePreviousCareer} />
                            </label>
                            <label style={item}>
                                <Typography>Highest Education Level</Typography>
                                <select style={input} name="HighestEd" onChange={changeHighestEd}>
                                    <option value="High School">High School</option>
                                    <option value="Some College">Some College</option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Doctorate">Doctorate</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Degree Name</Typography>
                                <input type="text" style={input} name="DegreeName" onChange={changeDegree} />
                            </label>
                            <label style={item}>
                                <Typography>Highest Level of Professianl Military Education</Typography>
                                <input type="text" style={input} name="PME" onChange={changePME} />
                            </label>
                            <label style={item}>
                                <Typography>Security Clearance</Typography>
                                <select style={input} name="SecClearance" onChange={changeSecurityClearance}>
                                    <option value="Secret">Secret</option>
                                    <option value="Top Secret">Top Secret</option>
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
                                <Typography>Official Email</Typography>
                                <input type="text" style={input} name="OfficialEmail" onChange={changeOfficialEmail} />
                            </label>
                            <label style={item}>
                                <Typography>Personal Email</Typography>
                                <input type="text" style={input} name="PersonalEmail" onChange={changePersonalEmail} />
                            </label>
                            <label style={item}>
                                <Typography>Commercial Phone</Typography>
                                <input type="text" style={input} name="ComPhone" onChange={changeComPhone} />
                            </label>
                            <label style={item}>
                                <Typography>DSN Phone</Typography>
                                <input type="text" style={input} name="DSNPhone" onChange={changeDSNPhone} />
                            </label>
                            <label style={item}>
                                <Typography>Date of Birth</Typography>
                                <input type="text" style={input} name="DOB" onChange={changeDOB} />
                            </label>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>Gender</Typography>
                                <select style={input} name="Gender" onChange={changeGender}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Race</Typography>
                                <select style={input} name="Race" onChange={changeRace}>
                                    <option value="White">White</option>
                                    <option value="Black">Black</option>
                                    <option value="Asain">Asain</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Ethnicity</Typography>
                                <select style={input} name="Ethnicity" onChange={changeEthnicity}>
                                    <option value="Hispanic">Hispanic or Latino</option>
                                    <option value="Not Hispanic">Not Hispanic or Latino</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>DOD ID</Typography>
                                <input type="text" style={input} name="DODID" onChange={changeDODID} />
                            </label>
                            <label style={item}>
                                <Typography>Social Security Number</Typography>
                                <input type="text" style={input} name="SSN" onChange={changeSSN} />
                            </label>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>Street Address</Typography>
                                <input type="text" style={input} name="Street" onChange={changeStreet} />
                            </label>
                            <label style={item}>
                                <Typography>City</Typography>
                                <input type="text" style={input} name="City" onChange={changeCity} />
                            </label>
                            <label style={item}>
                                <Typography>State</Typography>
                                <select style={input} name="State" onChange={changeState}>
                                    <option value="CO">CO</option>
                                    <option value="CA">CA</option>
                                    <option value="TX">TX</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Zip Code</Typography>
                                <input type="text" style={input} name="ZipCode" onChange={changeZip} />
                            </label>
                            <label style={item}>
                                <Typography>Country</Typography>
                                <select style={input} name="Country" onChange={changeCountry}>
                                    <option value="USA">United States</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Japan">Japan</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>Married Mil-to-Mil?</Typography>
                                <select style={input} name="Married" onChange={changeMarried}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </label>
                            <label style={item}>
                                <Typography>If yes, full name of spouse</Typography>
                                <input type="text" style={input} name="SpouseName" onChange={changeSpouse} />
                            </label>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                lexDirection: "row",
                            }}
                        >
                            <label style={item}>
                                <Typography>Current Unit/Det Name</Typography>
                                <input type="text" style={input} name="UnitName" onChange={changeUnitName} />
                            </label>
                            <label style={item}>
                                <Typography>Unit/Det Location</Typography>
                                <input type="text" style={input} name="UnitLocation" onChange={changeUnitLocation} />
                            </label>
                            <label style={item}>
                                <Typography>Current Commander</Typography>
                                <input type="text" style={input} name="Commander" onChange={changeCommander} />
                            </label>
                            <label style={item}>
                                <Typography>Commander Com Phone</Typography>
                                <input
                                    type="text"
                                    style={input}
                                    name="CommanderComPhone"
                                    onChange={changeCommanderComPhone}
                                />
                            </label>
                            <label style={item}>
                                <Typography>Commander DSN Phone</Typography>
                                <input
                                    type="text"
                                    style={input}
                                    name="CommanderDSNPhone"
                                    onChange={changeCommanderDSNPhone}
                                />
                            </label>
                            <label style={item}>
                                <Typography>Commander Email</Typography>
                                <input
                                    type="text"
                                    style={input}
                                    name="CommanderEmail"
                                    onChange={changeCommanderEmail}
                                />
                            </label>
                        </Box>
                    </form>
                </Typography>
            </Box>
        </>
    );
};

export default ISTForm;
