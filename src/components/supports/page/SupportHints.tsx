// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";

// MUI imports
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { SupportProps } from "types/support";

function SupportHints({ support }: SupportProps) {
    const theme = useTheme();

    const { hints } = support;

    return (
        <MainContentBox title="Support Hints">
            <Grid container spacing={2}>
                {hints.map((skill, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, sm: 6, lg: 12 }}
                        sx={{
                            px: 2,
                            py: 1,
                            backgroundColor: theme.background(1, "light"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <SkillInfo tag={skill} />
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default SupportHints;
