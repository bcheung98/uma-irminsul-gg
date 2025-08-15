import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import RarityStars from "custom/RarityStars";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, Box } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";

function SkillInfo({ tag }: { tag: string | number }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const skill = useAppSelector(selectSkills).find(
        (skill) => skill.id === tag || skill.name === tag
    );

    if (skill !== undefined) {
        return (
            <Box>
                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    sx={{ mb: "8px" }}
                >
                    <Image
                        src={`skills/${skill.icon}`}
                        alt={skill.icon.toString()}
                        style={{
                            width: matches_md_up ? "48px" : "40px",
                        }}
                    />
                    <Box>
                        <TextStyled variant="h6-styled" sx={{ mb: "-4px" }}>
                            {skill.name}
                        </TextStyled>
                        {skill.unlock && (
                            <RarityStars
                                rarity={skill.unlock}
                                variant="h6-styled"
                            />
                        )}
                    </Box>
                </Stack>
                <Text component="span" sx={{ color: theme.text.description }}>
                    {parse(skill.description.global.short)}
                </Text>
            </Box>
        );
    } else {
        return <></>;
    }
}

export default SkillInfo;
