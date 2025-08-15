// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";

// MUI imports
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    const theme = useTheme();

    return (
        <>
            {Object.entries(character.skills).map(([key, skills]) => (
                <MainContentBox key={key} title={`${toTitleCase(key)} Skills`}>
                    <Grid container spacing={2}>
                        {skills.map((skill: string | number, index: number) => (
                            <Grid
                                key={index}
                                size={{ xs: 12, md: 6 }}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    backgroundColor: theme.background(
                                        1,
                                        "light"
                                    ),
                                    border: theme.mainContentBox.border,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                }}
                            >
                                <SkillInfo tag={skill} />
                            </Grid>
                        ))}
                    </Grid>
                </MainContentBox>
            ))}
        </>
    );
}

export default CharacterSkills;
