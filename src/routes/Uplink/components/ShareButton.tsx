import ShareIcon from "@mui/icons-material/Share";
import { Button, List, ListItem, ListItemButton, ListItemText, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useSnack from "common/components/SnackBar/ProvideSnack";
import { FC, MouseEvent, useState } from "react";

interface ShareButtonProps {
    link: string;
}

const ShareButton: FC<ShareButtonProps> = (props: ShareButtonProps) => {
    const snack = useSnack();
    const { link } = props;
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link);
        handleClose();
        snack("success", "Copied to Clipboard!");
    };

    return (
        <>
            <Button size="small" sx={{ mr: theme.spacing(1) }} startIcon={<ShareIcon />} onClick={handleClick}>
                Share
            </Button>
            <Popover
                id="share-button-popover"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <List dense disablePadding>
                    <ListItem>
                        <ListItemButton onClick={handleCopyLink}>
                            <ListItemText primary="Copy Link" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </>
    );
};

export default ShareButton;
