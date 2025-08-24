// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    return (
        <MainContentBox title="Skills" contentProps={{ padding: "16px" }}>
            <Grid container spacing={2}>
                {Object.entries(character.skills).map(([key, skills]) => (
                    <Grid
                        key={key}
                        size={key === "unique" ? 12 : { xs: 12, md: 4 }}
                    >
                        <TextStyled sx={{ mb: "8px" }}>
                            {`${toTitleCase(key)} Skills`}
                        </TextStyled>
                        <Grid container spacing={2}>
                            {skills.map(
                                (skill: string | number, index: number) => (
                                    <Grid
                                        key={index}
                                        size={{
                                            xs: 12,
                                            md: key === "unique" ? 6 : 12,
                                        }}
                                    >
                                        <SkillInfo
                                            tag={skill}
                                            variant={
                                                key === "unique"
                                                    ? "normal"
                                                    : "mini"
                                            }
                                        />
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterSkills;
