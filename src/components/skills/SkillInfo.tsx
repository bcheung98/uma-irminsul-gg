import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import RarityStars from "custom/RarityStars";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, Box } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";

function SkillInfo({
    tag,
    variant = "normal",
}: {
    tag: string | number;
    variant?: "normal" | "mini";
}) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const skill = useAppSelector(selectSkills).find(
        (skill) => skill.id === tag || skill.name.global === tag
    );

    if (skill !== undefined) {
        const skillUnlock = skill.rarity === 4 && (
            <FlexBox>
                <TextStyled>(</TextStyled>
                <RarityStars rarity={3} />
                <TextStyled>+)</TextStyled>
            </FlexBox>
        );
        const skillDesc = (
            <Text
                component="span"
                variant={matches_md_up ? "body2-styled" : "body1-styled"}
                sx={{ color: theme.text.description }}
            >
                {parse(skill.description.global)}
            </Text>
        );

        return (
            <>
                {variant === "normal" ? (
                    <Box>
                        <Stack
                            spacing={2}
                            direction="row"
                            alignItems={{ xs: "center", md: "flex-start" }}
                            sx={{ mb: "8px" }}
                        >
                            <Image
                                src={`skills/${skill.icon}`}
                                alt={skill.icon.toString()}
                                style={{
                                    width: matches_md_up ? "48px" : "40px",
                                    marginTop: matches_md_up ? "8px" : "0px",
                                }}
                            />
                            <Box>
                                <FlexBox flexWrap="wrap" gap="8px">
                                    <TextStyled>{skill.name.global}</TextStyled>
                                    {matches_md_up && skillUnlock}
                                </FlexBox>
                                {matches_md_up ? skillDesc : skillUnlock}
                            </Box>
                        </Stack>
                        {!matches_md_up && skillDesc}
                    </Box>
                ) : (
                    <Stack spacing={1.5} direction="row" alignItems="center">
                        <Image
                            src={`skills/${skill.icon}`}
                            alt={skill.icon.toString()}
                            style={{ width: matches_md_up ? "28px" : "24px" }}
                        />
                        <TextStyled variant="body2-styled">
                            {skill.name.global}
                        </TextStyled>
                    </Stack>
                )}
            </>
        );
    } else {
        return <></>;
    }
}

export default SkillInfo;
