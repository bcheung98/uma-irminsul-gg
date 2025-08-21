import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, SxProps, Stack, Box } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";
import { getSkillRarityColor } from "helpers/skillRarity";

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
        const skillUnlock = skill.rarity === 4 && <TextStyled>(3★)</TextStyled>;
        const skillName = skill.name.global || skill.name.jp;
        const skillDesc = (
            <Text
                component="span"
                variant={matches_md_up ? "body2-styled" : "body1-styled"}
                sx={{ color: theme.text.description }}
            >
                {parse(skill.description.global || skill.description.jp)}
            </Text>
        );

        const textContainerStyle: SxProps = {
            p: skill.rarity >= 2 ? "2px 8px" : "0px",
            borderRadius:
                skill.rarity >= 2 ? theme.mainContentBox.borderRadius : 0,
            backgroundImage: getSkillRarityColor(skill.rarity),
        };

        const textContainerStyleMini: SxProps = {
            p: "4px 8px",
            borderRadius: theme.mainContentBox.borderRadius,
            backgroundImage: getSkillRarityColor(skill.rarity),
            backgroundColor: theme.background(0, "main"),
            "&:hover": {
                outline: `2px solid ${
                    skill.rarity >= 2
                        ? theme.text.primary
                        : theme.border.color.primary
                }`,
            },
        };

        const textStyle = {
            color: skill.rarity >= 2 ? "rgb(121, 64, 22)" : theme.text.primary,
        };

        return (
            <>
                {variant === "normal" ? (
                    <Box>
                        <Stack
                            spacing={2}
                            direction="row"
                            alignItems={{ xs: "center", md: "flex-start" }}
                            sx={{ mb: { xs: "8px", lg: 0 } }}
                        >
                            <Stack
                                spacing={0.5}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    src={`skills/${skill.icon}`}
                                    alt={skill.icon.toString()}
                                    style={{
                                        width: matches_md_up ? "48px" : "40px",
                                    }}
                                />
                                {matches_md_up && skillUnlock}
                            </Stack>
                            <Box sx={{ width: { xs: "75%", sm: "50%" } }}>
                                <FlexBox
                                    flexWrap="wrap"
                                    gap="8px"
                                    alignItems="center"
                                    sx={textContainerStyle}
                                >
                                    <TextStyled sx={textStyle}>
                                        {skillName}
                                    </TextStyled>
                                </FlexBox>
                                <Box sx={{ width: "150%", mt: "4px" }}>
                                    {matches_md_up ? skillDesc : skillUnlock}
                                </Box>
                            </Box>
                        </Stack>
                        {!matches_md_up && skillDesc}
                    </Box>
                ) : (
                    <Stack
                        spacing={1.5}
                        direction="row"
                        alignItems="center"
                        sx={textContainerStyleMini}
                    >
                        <Image
                            src={`skills/${skill.icon}`}
                            alt={skill.icon.toString()}
                            style={{ width: matches_md_up ? "28px" : "24px" }}
                        />
                        <TextStyled variant="body2-styled" sx={textStyle}>
                            {skillName}
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
