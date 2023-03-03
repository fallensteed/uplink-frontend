import { Avatar, Button, Paper } from "@mui/material";
import SpriteIcon from "common/components/SpriteIcon";
import { useUser } from "common/context/User/UserContext";
import theme from "config/theme";
import { useNavigate } from "react-router-dom";

const AddPostFauxTextBox = () => {
    const navigate = useNavigate();
    const user = useUser();

    return (
        <Paper sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
            <Avatar sx={{ backgroundColor: "white", height: 32, width: 32, ml: 1 }}>
                <SpriteIcon seed={`${user.profile.uplinkUsername}`} size={24} />
            </Avatar>
            <Button
                fullWidth
                id="add-new-post-field"
                variant="outlined"
                sx={{
                    background: "#fff",
                    m: theme.spacing(1),
                    borderRadius: theme.spacing(0.5),
                    justifyContent: "flex-start",
                    cursor: "text",
                    textTransform: "none",
                    transition: "none",
                    "&:hover": {
                        backgroundColor: "#fff",
                    },
                }}
                onClick={() => navigate("/submit")}
            >
                Add New Post
            </Button>
        </Paper>
    );
};

export default AddPostFauxTextBox;
