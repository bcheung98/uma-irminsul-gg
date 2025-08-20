// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    const theme = useTheme();

    return (
        <MainContentBox title="Skills">
            <Stack spacing={2}>
                {Object.entries(character.skills).map(([key, skills]) => (
                    <Box key={key}>
                        <TextStyled sx={{ mb: "8px" }}>{`${toTitleCase(
                            key
                        )} Skills`}</TextStyled>
                        <Grid container spacing={2}>
                            {skills.map(
                                (skill: string | number, index: number) => (
                                    <Grid
                                        key={index}
                                        size={{ xs: 12, md: 6 }}
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            backgroundColor: theme.background(
                                                0,
                                                "main"
                                            ),
                                            border: theme.mainContentBox.border,
                                            borderRadius:
                                                theme.mainContentBox
                                                    .borderRadius,
                                        }}
                                    >
                                        <SkillInfo tag={skill} />
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Box>
                ))}
            </Stack>
        </MainContentBox>
    );
}

export default CharacterSkills;
