import { useState } from "react";

// Component imports
import SkillPopup from "components/skills/SkillPopup";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import { useTheme, Dialog } from "@mui/material";

// Helper imports
import { countText } from "helpers/utils";
import { useAppSelector } from "helpers/hooks";
import { selectSkills } from "reducers/skill";
import { getRaceName } from "helpers/races";
import { raceSeries } from "data/races";
import { statusEffects } from "data/statusEffects";

// Type imports
import { EventOutcome, EventSubHint, EventSubOutcome } from "types/event";

export function TextHighlight({
    children,
    color,
}: {
    children: React.ReactNode;
    color?: string;
}) {
    const theme = useTheme();
    return (
        <span style={{ color: color || theme.text.highlight }}>{children}</span>
    );
}

export function SkillHint({
    event,
    isHint,
}: {
    event: EventSubOutcome;
    isHint: boolean;
}) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { value, data } = event;
    const skill = useAppSelector(selectSkills).find(
        (skill) => skill.id === data
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
                {isHint && ` hint ${value}`}
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
}

export function SkillText({ event }: { event: EventOutcome }) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { value } = event;
    const skill = useAppSelector(selectSkills).find(
        (skill) => skill.id === value
    );
    let res = <></>;
    if (skill) {
        res = (
            <>
                {`Obtain `}
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
    return res;
}

export function SkillTextRandom({ eventHints }: { eventHints?: EventSubHint }) {
    if (eventHints) {
        const hints = eventHints.map((hint) =>
            SkillHint({ event: hint, isHint: true })
        );
        return (
            <>
                {hints.map((hint, index) => (
                    <span key={index}>
                        {hint}
                        {index < hints.length - 1 && (
                            <TextHighlight>{` or `}</TextHighlight>
                        )}
                    </span>
                ))}
            </>
        );
    } else {
        return <></>;
    }
}

export function StatusEffect({
    effectID,
    text = "",
    count = 1,
}: {
    effectID?: number | string;
    text?: string;
    count?: number | number[];
}) {
    const theme = useTheme();

    const effect = statusEffects.find(
        (effect) => effect.id === Number(effectID)
    );
    let name = "?";
    let description = "";
    if (effect) {
        name = effect.name || effect.nameJP;
        description = effect.description || effect.descriptionJP;
    }
    const [s1, s2] = text.split("<>");
    return (
        <>
            {s1 && `${s1} `}
            <StyledTooltip title={description} placement="top">
                <span
                    style={{
                        color: theme.text.value,
                        textDecoration: "underline dotted",
                        cursor: "help",
                    }}
                >
                    {name}
                </span>
            </StyledTooltip>
            {s2 && ` ${s2}`}
            {countText({
                count,
                single: "",
                multi: `${count} times`,
            })}
        </>
    );
}

export function Race({
    race = 0,
    text = "Win the",
    count = 1,
}: {
    race?: number | string;
    text?: string;
    count?: number;
}) {
    const [s1, s2, s3] = text.split("<>");
    return (
        <>
            {s1 && `${s1} `}
            <TextHighlight>{getRaceName(race.toString())}</TextHighlight>
            {s2 && ` ${s2}`}
            {s3 && count > 1 && ` ${s3}`}
        </>
    );
}

export function RaceMulti({
    races = [],
    text = "Win the following races:",
    divider = ", ",
    count = 1,
}: {
    races?: (string | number)[];
    text?: string;
    divider?: string;
    count?: number;
}) {
    const [s1, s2, s3] = text.split("<>");
    return (
        <>
            {s1 && `${s1} `}
            {races.map((race, index) => (
                <span key={index}>
                    <TextHighlight>
                        {getRaceName(race.toString())}
                    </TextHighlight>
                    {index < races.length - 1 && `${divider}`}
                    {s2 && ` ${s2}`}
                    {s3 && count > 1 && ` ${s3}`}
                </span>
            ))}
        </>
    );
}

export function RaceSeries({ tag }: { tag: string }) {
    const theme = useTheme();

    const r = raceSeries[tag];
    return (
        <>
            {`Win the ${r.name}`}
            <br />
            {r.races.map((race, index) => (
                <span key={index} style={{ color: theme.text.highlight }}>
                    {`- ${getRaceName(race)}`}
                    <br />
                </span>
            ))}
        </>
    );
}

// export function EventName({
//     eventName,
//     text = "",
// }: {
//     eventName: string;
//     text?: string;
// }) {
//     const [s1, s2] = text.split("<>");
//     return (
//         <>
//             {`${s1} `}
//             <TextHighlight>{eventName}</TextHighlight>
//             {s2 && ` ${s2}`}
//         </>
//     );
// }
