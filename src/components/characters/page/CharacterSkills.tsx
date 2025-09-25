// Component imports
import MainContentBox from "custom/MainContentBox";
import SkillInfo from "components/skills/SkillInfo";
import SkillEvoConditions from "components/skills/SkillEvoConditions";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import {
    selectServer,
    selectUnreleasedContent,
    selectWidth,
} from "reducers/settings";

// Type imports
import { CharacterEvoSkill, CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    const width = useAppSelector(selectWidth);
    const showUnreleasedContent = useAppSelector(selectUnreleasedContent);
    const server = useAppSelector(selectServer);

    const { skills } = character;

    let eventSkills = skills.event;
    if (showUnreleasedContent && skills.eventJP) {
        eventSkills = skills.eventJP;
    }
    const skillsMain = {
        Unique: skills.unique,
        Innate: skills.innate,
        Awakening: skills.awakening,
        Event: eventSkills,
        Evolved: skills.evo,
    };
    type SkillKey = keyof typeof skillsMain;

    const showSkill = (key: SkillKey) => {
        if (skillsMain[key]?.length === 0) {
            return false;
        }
        if (key === "Evolved") {
            return character.release.global === "" || showUnreleasedContent;
        }
        return true;
    };

    const renderSkill = (key: SkillKey, skills: number[]) => (
        <Grid container spacing={2}>
            {skills.map((skill, index) => (
                <Grid
                    key={index}
                    size={{
                        xs: 12,
                        lg:
                            key === "Unique" && width === "standard"
                                ? "grow"
                                : 12,
                        xl: key === "Unique" && width === "standard" ? 6 : 12,
                    }}
                >
                    <SkillInfo
                        tag={skill}
                        variant={key === "Unique" ? "normal" : "mini"}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const renderEvoSkill = (skills: CharacterEvoSkill[]) => (
        <Stack spacing={4}>
            {skills.map((skill, index) => (
                <Stack key={index} spacing={0.5}>
                    <SkillEvoConditions tag={skill.new} />
                    {Object.values(skill)
                        .reverse()
                        .map((s, i) => (
                            <Grid
                                key={i}
                                container
                                columnSpacing={2}
                                alignItems="center"
                            >
                                <Grid size={i === 0 ? { xs: 10, sm: 4 } : 12}>
                                    <SkillInfo
                                        tag={s}
                                        variant={i === 1 ? "normal" : "mini"}
                                    />
                                </Grid>
                                <Grid size="auto">
                                    {i == 0 && <TextStyled>❯❯❯</TextStyled>}
                                </Grid>
                            </Grid>
                        ))}
                </Stack>
            ))}
        </Stack>
    );

    return (
        <MainContentBox title="Skills" contentProps={{ padding: "16px" }}>
            <Grid container spacing={2}>
                {Object.entries(skillsMain).map(
                    ([key, skills]) =>
                        showSkill(key as SkillKey) && (
                            <Grid
                                key={key}
                                size={
                                    key === "Unique" || key === "Evolved"
                                        ? 12
                                        : { xs: 12, sm: 6, md: 4 }
                                }
                            >
                                <TextStyled sx={{ mb: "8px" }}>
                                    {`${key} Skills`}
                                    {server === "NA" &&
                                        key === "Evolved" &&
                                        " (JP server only)"}
                                </TextStyled>
                                {key !== "Evolved"
                                    ? renderSkill(
                                          key as SkillKey,
                                          skills as number[]
                                      )
                                    : renderEvoSkill(
                                          skills as CharacterEvoSkill[]
                                      )}
                            </Grid>
                        )
                )}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterSkills;
