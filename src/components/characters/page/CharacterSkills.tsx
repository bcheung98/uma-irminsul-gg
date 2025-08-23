// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    return (
        <MainContentBox title="Skills" contentProps={{ padding: "16px" }}>
            <Stack spacing={2}>
                {Object.entries(character.skills).map(([key, skills]) => (
                    <Box key={key}>
                        <TextStyled sx={{ mb: "8px" }}>
                            {`${toTitleCase(key)} Skills`}
                        </TextStyled>
                        <Grid container spacing={2}>
                            {skills.map(
                                (skill: string | number, index: number) => (
                                    <Grid key={index} size={{ xs: 12, md: 6 }}>
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
