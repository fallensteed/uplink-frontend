import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import { CommunityRule } from "../../api/community/community.api";

interface CommunityRulesProps {
    rules?: CommunityRule[];
}

const CommunityRules: FC<CommunityRulesProps> = (props: CommunityRulesProps) => {
    const { rules } = props;
    const theme = useTheme();

    return rules ? (
        <Paper sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}>
            <Typography variant="h6">Community Rules</Typography>
            <List>
                {rules
                    ?.sort((a, b) => a.order - b.order)
                    .map((rule) => (
                        <ListItem key={`${rule.order}. ${rule.name}`}>
                            <ListItemText primary={rule.name} secondary={rule.detail} />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    ) : null;
};

export default CommunityRules;
