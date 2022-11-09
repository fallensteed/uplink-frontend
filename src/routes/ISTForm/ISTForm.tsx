import { Box, Typography } from "@mui/material";
import { FC } from "react";

const row = {
    margin: "10px",
};

const item = {
    margin: "10px",
    padding: "5px",
};

const input = {
    margin: "10px",
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
                        <Box style={row}>
                            <label style={item}>
                                First Name
                                <input style={input} type="text" />
                            </label>
                            <label style={item}>
                                Last Name
                                <input style={input} type="text" />
                            </label>
                        </Box>
                    </form>
                </Typography>
            </Box>
        </>
    );
};

export default ISTForm;
