import { useState } from "react";

// Component imports
import SkillPopup from "components/skills/SkillPopup";
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import { useTheme, Dialog } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";
import { selectCharacterProfiles } from "reducers/characterProfiles";
import { statusEffects } from "data/statusEffects";

// Type imports
import { EventOutcome } from "types/event";

function EventText({ outcome }: { outcome: EventOutcome }) {
    const theme = useTheme();

    const { tag, value, prop } = outcome;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let res = <></>;

    const renderHint = (event: EventOutcome) => {
        const { value, prop } = event;
        const skill = useAppSelector(selectSkills).find(
            (skill) => skill.id === prop
        );
        let hint = <></>;
        if (skill) {
            hint = (
                <>
                    <span
                        onClick={handleClickOpen}
                        style={{
                            color: theme.text.value,
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        {skill.name.global || skill.name.jp}
                    </span>
                    {` hint ${value}`}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth="sm"
                        fullWidth
                        disableScrollLock
                    >
                        <SkillPopup
                            skill={skill}
                            showSources={false}
                            handleClose={handleClose}
                        />
                    </Dialog>
                </>
            );
        }
        return hint;
    };

    if (tag === "Hint") {
        res = renderHint(outcome);
    } else if (tag === "") {
        if (Array.isArray(prop)) {
            const hints = prop.map((hint) => renderHint(hint));
            res = (
                <span>
                    {hints.map((hint, index) => (
                        <span key={index}>
                            {hint}
                            {index < hints.length - 1 && (
                                <span
                                    style={{ color: theme.text.highlight }}
                                >{` or `}</span>
                            )}
                        </span>
                    ))}
                </span>
            );
        }
    } else if (tag === "Status") {
        const statusEffect = statusEffects.find((effect) => effect.id === prop);
        if (statusEffect) {
            res = (
                <>
                    {`Get `}
                    <StyledTooltip
                        title={
                            statusEffect.description ||
                            statusEffect.descriptionJP
                        }
                        placement="top"
                    >
                        <span
                            style={{
                                color: theme.text.value,
                                textDecoration: "underline dotted",
                                cursor: "pointer",
                            }}
                        >
                            {statusEffect.name || statusEffect.nameJP}
                        </span>
                    </StyledTooltip>
                    {` status`}
                </>
            );
        }
    } else if (tag === "Bond") {
        const character = useAppSelector(selectCharacterProfiles).find(
            (character) => character.id === prop
        );
        if (character) {
            res = (
                <span>{`${character.name || character.nameJP} bond ${
                    value || ""
                }`}</span>
            );
        }
    } else {
        res = (
            <span
                style={{
                    color:
                        tag === "Event chain ended"
                            ? theme.text.highlight
                            : theme.text.primary,
                }}
            >{`${tag} ${value || ""}`}</span>
        );
    }

    return (
        <>
            <TextStyled variant="body2-styled">{res}</TextStyled>
        </>
    );
}

export default EventText;
