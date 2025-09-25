// Component imports
import EventText from "components/events/EventText";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Box, Divider } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";

function SkillEvoConditions({ tag }: { tag: number }) {
    const theme = useTheme();

    const skill = useAppSelector(selectSkills).find(
        (skill) => skill.id === tag
    );

    if (skill && skill.evo) {
        const evo = skill.evo;
        return (
            <Stack spacing={0} sx={{ borderRadius: "4px" }}>
                <Box
                    sx={{
                        p: 1,
                        backgroundColor: theme.background(2, "light"),
                        borderRadius: "4px 4px 0 0",
                        borderBottom: `1px solid ${theme.border.color.primary}`,
                    }}
                >
                    <TextStyled>Conditions:</TextStyled>
                </Box>
                <Stack
                    sx={{ backgroundColor: theme.background(0), px: 1 }}
                    divider={<Divider />}
                >
                    {evo.evoConditions.map((condition, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {condition.map((con, i) => (
                                <Box key={i}>
                                    <EventText outcome={con} />
                                    {i < condition.length - 1 && (
                                        <TextStyled
                                            variant="body2-styled"
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            or
                                        </TextStyled>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Stack>
            </Stack>
        );
    } else {
        return <></>;
    }
}

export default SkillEvoConditions;
