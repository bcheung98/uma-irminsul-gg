// Component imports
import Image from "custom/Image";

import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";

function SkillInfoMini({ tag }: { tag: string | number }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const skill = useAppSelector(selectSkills).find(
        (skill) => skill.id === tag || skill.name.global === tag
    );

    if (skill !== undefined) {
        return (
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
        );
    } else {
        return <></>;
    }
}

export default SkillInfoMini;
