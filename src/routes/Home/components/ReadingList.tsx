import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";

const mockReadingList = [
    {
        name: "Guardian Ideal",
        link: "https://media.defense.gov/2021/Sep/21/2002858512/-1/-1/1/GUARDIAN%20IDEAL%20-%20FINAL.PDF",
    },
    {
        name: "SpacePower Doctrine",
        link: "https://www.spaceforce.mil/Portals/1/Space%20Capstone%20Publication_10%20Aug%202020.pdf",
    },
    {
        name: "The Little Book of Space Law",
        link: "https://www.amazon.com/Little-Book-Space-Law-Books-ebook/dp/B01M1SPXZ7/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=",
    },
    { name: "Star Wars: A New Hope", link: "https://www.amazon.com/Star-Wars-Episode-IV-Hope/dp/0345341465" },
];

const ReadingList: FC = () => {
    const theme = useTheme();
    return (
        <Paper sx={{ width: "100%", height: "auto", mb: theme.spacing(2) }}>
            <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
                CSO Reading List
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <List dense sx={{ background: "none" }}>
                        {mockReadingList
                            .filter((book, index) => index <= 1)
                            .map((book) => (
                                <ListItem
                                    key={book.name}
                                    divider
                                    disablePadding
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.common.white,
                                        borderRadius: theme.spacing(0.75),
                                        mb: theme.spacing(0.75),
                                    }}
                                >
                                    <ListItemButton component="a" href={book.link} target="_blank">
                                        <ListItemText
                                            primary={book.name}
                                            sx={{ textAlign: "center" }}
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Grid>
                <Grid xs={6}>
                    <List dense sx={{ background: "none" }}>
                        {mockReadingList
                            .filter((book, index) => index > 1)
                            .map((book) => (
                                <ListItem
                                    key={book.name}
                                    divider
                                    disablePadding
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.common.white,
                                        borderRadius: theme.spacing(0.75),
                                        mb: theme.spacing(0.75),
                                    }}
                                >
                                    <ListItemButton component="a" href={book.link} target="_blank">
                                        <ListItemText
                                            primary={book.name}
                                            sx={{ textAlign: "center" }}
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ReadingList;
