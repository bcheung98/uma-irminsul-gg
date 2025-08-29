// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { toTitleCase } from "helpers/utils";
import { useAppSelector } from "helpers/hooks";
import { selectWidth } from "reducers/settings";

// Type imports
import { CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    const width = useAppSelector(selectWidth);

    return (
        <MainContentBox title="Skills" contentProps={{ padding: "16px" }}>
            <Grid container spacing={2}>
                {Object.entries(character.skills).map(([key, skills]) => (
                    <Grid
                        key={key}
                        size={key === "unique" ? 12 : { xs: 12, sm: 6, md: 4 }}
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
                                            lg:
                                                key === "unique" &&
                                                width === "standard"
                                                    ? "grow"
                                                    : 12,
                                            xl:
                                                key === "unique" &&
                                                width === "standard"
                                                    ? 6
                                                    : 12,
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
