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
import { raceSeries } from "data/races";
import { getRaceName } from "helpers/races";
import { parseEventTag } from "helpers/parseEventTag";

// Type imports
import { EventOutcome, StatusEffect } from "types/event";

function EventText({ outcome }: { outcome: EventOutcome }) {
    const theme = useTheme();

    const { tag, value, prop, random } = outcome;

    let res = <></>;

    const character = useAppSelector(selectCharacterProfiles).find(
        (character) => character.id === Number(prop)
    );
    const statusEffect = statusEffects.find(
        (effect) => effect.id === Number(prop)
    );

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

    const renderStatusEffect = (effect: StatusEffect) => (
        <StyledTooltip
            title={effect.description || effect.descriptionJP}
            placement="top"
        >
            <span
                style={{
                    color: theme.text.value,
                    textDecoration: "underline dotted",
                    cursor: "help",
                }}
            >
                {effect.name || effect.nameJP}
            </span>
        </StyledTooltip>
    );

    const renderRace = (text = "Win") => {
        let races: string[] = [];
        if (Array.isArray(prop)) {
            races = prop.find((i) => i.tag === "Race")!.value as string[];
        } else {
            races = [value!.toString()];
        }
        return (
            <>
                {races.map((race, index) => (
                    <span key={index}>
                        {`${text} the `}
                        <span style={{ color: theme.text.highlight }}>
                            {getRaceName(race)}
                        </span>
                    </span>
                ))}
            </>
        );
    };

    const renderCrownRace = (tag: string) => {
        const races = raceSeries.find((r) => r.name === tag)?.races || [];
        return (
            <>
                {`Win the ${tag}:`}
                <br />
                {races.map((race, index) => (
                    <span key={index} style={{ color: theme.text.highlight }}>
                        {`- ${getRaceName(race)}`}
                        <br />
                    </span>
                ))}
            </>
        );
    };

    switch (tag) {
        case "<br />":
            res = <br />;
            break;
        case "Hint":
            res = renderHint(outcome, true);
            break;
        case "Get skill":
            res = renderHint(outcome, false);
            break;
        case "Random stats":
            res = (
                <>{`${prop} random ${
                    Number(prop) > 1 ? "stats" : "stat"
                } ${value}`}</>
            );
            break;
        case "Stats":
            res = (
                <>{`${prop} ${Number(prop) > 1 ? "stats" : "stat"} ${value}`}</>
            );
            break;
        case "":
            if (Array.isArray(prop)) {
                const hints = prop.map((hint) => renderHint(hint, true));
                res = (
                    <>
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
                    </>
                );
            }
            break;
        case "Get status":
            if (statusEffect) {
                res = (
                    <>
                        {`Get `}
                        {renderStatusEffect(statusEffect)}
                        {` status`}
                    </>
                );
            }
            break;
        case "Status effect was healed":
            if (statusEffect) {
                res = (
                    <>
                        {`※ `}
                        {renderStatusEffect(statusEffect)}
                        {` was healed`}
                    </>
                );
            }
            break;
        case "Status effect was not healed":
            if (statusEffect) {
                res = (
                    <>
                        {`※ `}
                        {renderStatusEffect(statusEffect)}
                        {` was not healed`}
                    </>
                );
            }
            break;
        case "Bond":
            if (character) {
                res = (
                    <>
                        {`${character.name || character.nameJP} bond ${
                            value || ""
                        }`}
                    </>
                );
            }
            break;
        case "Scenario link":
            if (character) {
                res = (
                    <span>{`If ${
                        character.name || character.nameJP
                    } is scenario-linked:`}</span>
                );
            }
            break;
        case "Date":
            res = <>{`${value}`}</>;
            break;
        case "Fans min":
            res = <>{`Have at least ${value?.toLocaleString()} fans`}</>;
            break;
        case "Fans max":
            res = <>{`Have no more than ${value?.toLocaleString()} fans`}</>;
            break;
        case "Fans finals":
            res = (
                <>{`Have at least ${value?.toLocaleString()} fans before the finals`}</>
            );
            break;
        case "Disable training":
            res = (
                <>
                    {`${prop} random types of training will be disabled for one turn`}
                </>
            );
            break;
        case "Win G1":
            res = (
                <>{`Win ${
                    Array.isArray(value) ? value.join("-") : value
                } G1 races`}</>
            );
            break;
        case "Win":
            res = renderRace();
            break;
        case "Participate":
            res = renderRace("Run in");
            break;
        case "Do not participate":
            res = renderRace("Do not run in");
            break;
        case "Beat Rival":
            res = (
                <>
                    {`Run in the `}
                    <span style={{ color: theme.text.highlight }}>
                        {getRaceName(value!.toString())}
                    </span>
                    {` and beat ${character?.name || character?.nameJP || ""}`}
                </>
            );
            break;
        case "Draw Rival":
            res = (
                <>
                    {`Both you and ${
                        character?.name || character?.nameJP || ""
                    } lose the `}
                    <span style={{ color: theme.text.highlight }}>
                        {getRaceName(value!.toString())}
                    </span>
                </>
            );
            break;
        case "Lose Rival":
            res = (
                <>
                    {`Run in the `}
                    <span style={{ color: theme.text.highlight }}>
                        {getRaceName(value!.toString())}
                    </span>
                    {` and lose to ${
                        character?.name || character?.nameJP || ""
                    }`}
                </>
            );
            break;
        case "Triple Crown":
        case "Spring Triple Crown":
        case "Autumn Triple Crown":
        case "Senior Autumn Triple Crown":
        case "Triple Tiara":
            res = renderCrownRace(tag);
            break;
        case "Race change":
            res = (
                <>
                    {`Objective race changed to `}
                    <span style={{ color: theme.text.highlight }}>
                        {getRaceName(prop!.toString())}
                    </span>
                </>
            );
            break;
        case "Race cancelled":
            res = (
                <>
                    {`Objective race `}
                    <span style={{ color: theme.text.highlight }}>
                        {getRaceName(prop!.toString())}
                    </span>
                    {` cancelled`}
                </>
            );
            break;
        case "Race disabled":
            res = (
                <>{`Cannot race for ${prop} ${
                    Number(prop) > 1 ? "turns" : "turn"
                }`}</>
            );
            break;
        case "Race harder":
            res = (
                <>
                    {`Increased difficulty of `}
                    <span style={{ color: theme.text.highlight }}>
                        {getRaceName(value!.toString())}
                    </span>
                </>
            );
            break;
        case "Event next turn":
            res = <>{`Event ${prop} will occur next turn`}</>;
            break;
        default:
            res = (
                <span style={{ color: textColor }}>
                    {`${parseEventTag(tag) || "???"} ${value || ""}`}
                </span>
            );
            break;
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
