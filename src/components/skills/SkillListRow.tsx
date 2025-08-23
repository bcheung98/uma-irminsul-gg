import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import Image from "custom/Image";
import SkillPopup from "./SkillPopup";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { Skill } from "types/skill";

function SkillListRow({ skill, index }: { skill: Skill; index: number }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const [open, setOpen] = useState(false);
    const handleClickOpen = (_: BaseSyntheticEvent, skill: Skill) => {
        setCurrentSkill(skill);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

    useEffect(() => {
        setCurrentSkill(null);
    }, []);

    return (
        <>
            <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                key={skill.id}
                sx={{
                    p: "8px 16px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    backgroundColor:
                        index % 2 === 0
                            ? theme.background(1)
                            : theme.background(0, "dark"),
                    cursor: "pointer",
                    "&:hover": {
                        outline: `2px solid ${theme.text.primary}`,
                        outlineOffset: "-2px",
                    },
                }}
                onClick={(e) => handleClickOpen(e, skill)}
            >
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack
                        spacing={{ xs: 1, md: 2 }}
                        direction="row"
                        alignItems="center"
                    >
                        <Image
                            src={`skills/${skill.icon}`}
                            alt={skill.icon.toString()}
                            style={{
                                width: matches_md_up ? "32px" : "24px",
                            }}
                        />
                        <TextStyled variant="body2-styled">
                            {skill.name.global || skill.name.jp}
                        </TextStyled>
                    </Stack>
                </Grid>
                <Grid size="grow">
                    <TextStyled variant="body2-styled">
                        {skill.description.global || skill.description.jp}
                    </TextStyled>
                </Grid>
            </Grid>
            {currentSkill && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth
                    disableScrollLock
                >
                    <SkillPopup
                        skill={currentSkill}
                        handleClose={handleClose}
                    />
                </Dialog>
            )}
        </>
    );
}

export default SkillListRow;
