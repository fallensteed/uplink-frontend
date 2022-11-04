import { RuxClassificationMarking } from "@astrouxds/react";
import { Box } from "@mui/material";

const ClassificationBar = () => {
    return (
        <Box sx={{ backgroundColor: "#007a33", height: "auto", width: "100%", borderBottom: "1px solid #000" }}>
            <RuxClassificationMarking classification="unclassified" />
        </Box>
    );
};

export default ClassificationBar;
