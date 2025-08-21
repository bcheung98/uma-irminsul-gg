// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Icon, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// Type imports
import { SupportProps } from "types/support";

function SupportSkills({ support }: SupportProps) {
    const theme = useTheme();

    const { skills, stats } = support.hints;
    const { skillEvents } = support;

    const gridParams = {
        size: { xs: 12, md: 6 },
    };

    return (
        <MainContentBox title="Skills" contentProps={{ padding: "16px" }}>
            <Stack spacing={2}>
                {skillEvents.length > 0 && (
                    <Box>
                        <TextStyled sx={{ mb: "8px" }}>
                            Skills From Events
                        </TextStyled>
                        <Grid container spacing={1}>
                            {skillEvents.map((skill, index) => (
                                <Grid key={index} {...gridParams}>
                                    <SkillInfo tag={skill} variant="mini" />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                {skills.length > 0 && (
                    <Box>
                        <TextStyled sx={{ mb: "8px" }}>
                            Support Hints
                        </TextStyled>
                        <Grid container spacing={1}>
                            {skills.map((skill, index) => (
                                <Grid key={index} {...gridParams}>
                                    <SkillInfo tag={skill} variant="mini" />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                {stats.length > 0 && (
                    <Box>
                        <TextStyled sx={{ mb: "8px" }}>Stat Hints</TextStyled>
                        <Grid container>
                            <Grid
                                {...gridParams}
                                sx={{
                                    p: 1,
                                    backgroundColor: theme.background(
                                        0,
                                        "main"
                                    ),
                                    border: theme.mainContentBox.border,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                }}
                            >
                                <Stack spacing={1.5} direction="row">
                                    <Icon
                                        sx={{
                                            color: theme.text.primary,
                                            width: { xs: "24px", md: "28px" },
                                            height: { xs: "24px", md: "28px" },
                                        }}
                                    >
                                        <KeyboardDoubleArrowUpIcon />
                                    </Icon>
                                    <Box>
                                        {stats.map((stat) => (
                                            <TextStyled
                                                key={stat.type}
                                                variant="body2-styled"
                                            >
                                                {`${stat.type} +${stat.value}`}
                                            </TextStyled>
                                        ))}
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Stack>
        </MainContentBox>
    );
}

export default SupportSkills;
