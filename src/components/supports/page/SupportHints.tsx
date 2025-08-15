// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, Icon, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// Type imports
import { SupportProps } from "types/support";

function SupportHints({ support }: SupportProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { skills, stats } = support.hints;

    const gridParams = {
        size: { xs: 12, sm: 6, lg: 12 },
        sx: {
            px: 2,
            py: 1,
            backgroundColor: theme.background(1, "light"),
            border: theme.mainContentBox.border,
            borderRadius: theme.mainContentBox.borderRadius,
        },
    };

    return (
        <MainContentBox title="Support Hints">
            <Grid container spacing={2}>
                {skills.map((skill, index) => (
                    <Grid key={index} {...gridParams}>
                        <SkillInfo tag={skill} />
                    </Grid>
                ))}
                <Grid {...gridParams}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Icon
                            sx={{
                                color: theme.text.primary,
                                width: { xs: "40px", md: "48px" },
                                height: { xs: "40px", md: "48px" },
                            }}
                        >
                            <KeyboardDoubleArrowUpIcon fontSize="large" />
                        </Icon>
                        <Box>
                            <TextStyled variant="h6-styled">
                                Stat gain
                            </TextStyled>
                            {stats.map((stat) => (
                                <Text
                                    key={stat.type}
                                    variant={
                                        matches_md_up
                                            ? "body2-styled"
                                            : "body1-styled"
                                    }
                                    sx={{ color: theme.text.description }}
                                >{`${stat.type} +${stat.value}`}</Text>
                            ))}
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </MainContentBox>
    );
}

export default SupportHints;
