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

    const { tag, value, prop, random } = outcome;

    let res = <></>;

    const textColor = ["Event chain ended", "Recreation enabled"].includes(tag)
        ? theme.text.highlight
        : theme.text.primary;

    const renderHint = (event: EventOutcome, isHint: boolean) => {
        const [open, setOpen] = useState(false);
        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        const { value, prop } = event;
        const skill = useAppSelector(selectSkills).find(
            (skill) => skill.id === prop
        );
        let hint = <></>;
        if (skill) {
            hint = (
                <>
                    {!isHint && `Obtain `}
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
                    {isHint ? ` hint ${value}` : ` skill`}
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
        res = renderHint(outcome, true);
    } else if (tag === "Get skill") {
        res = renderHint(outcome, false);
    } else if (tag === "") {
        if (Array.isArray(prop)) {
            const hints = prop.map((hint) => renderHint(hint, true));
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
    } else if (tag === "<br />") {
        res = <br />;
    } else if (tag === "Get status") {
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
    } else if (tag === "Random stats") {
        res = <>{`${prop} random stats ${value}`}</>;
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
                    color: textColor,
                }}
            >{`${tag || "???"} ${value || ""}`}</span>
        );
    }

    return (
        <>
            <TextStyled variant="body2-styled">
                {random && `(Random) `}
                {res}
            </TextStyled>
        </>
    );
}

export default EventText;
