// Component imports
import {
    SkillHint,
    StatusEffect,
    Race,
    RaceMulti,
    RaceSeries,
    SkillText,
    SkillTextRandom,
} from "./EventTextRender";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacterProfiles } from "reducers/characterProfiles";
import { getEventText, getOrdinal, getStrategy } from "helpers/getEventText";

// Type imports
import { EventOutcome } from "types/event";

function EventText({
    outcome,
    prefix = "",
    charID = 1001,
}: {
    outcome: EventOutcome;
    prefix?: string;
    charID?: number | string;
}) {
    const theme = useTheme();

    const { tag, value, data, count, props, random } = outcome;

    const characters = useAppSelector(selectCharacterProfiles);
    const character = useAppSelector(selectCharacterProfiles).find(
        (character) => character.id === Number(data)
    );
    let charName = "";
    if (character) {
        charName = character.name || character.nameJP;
    }
    const textColor = ["event_chain_end", "rec_enabled"].includes(tag)
        ? theme.text.highlight
        : theme.text.primary;

    if (random) prefix = "(Random) ";

    function renderEventText(tag: string) {
        switch (tag) {
            case "nl":
                return <br />;
            case "skill_hint":
                return SkillHint({ event: outcome, isHint: true });
            case "obtain_skill":
                return SkillHint({ event: outcome, isHint: false });
            case "obtain_status":
                return StatusEffect({
                    effectID: data,
                    text: "Obtain <> status",
                });
            case "cond":
                return StatusEffect({ effectID: data, text: "Get the" });
            case "cond_e":
                return StatusEffect({
                    effectID: data,
                    text: "Have the <> status effect at the end of training",
                    count,
                });
            case "cond_healed":
                return StatusEffect({
                    effectID: data,
                    text: "※ <> was healed",
                });
            case "cond_not_healed":
                return StatusEffect({
                    effectID: data,
                    text: "※ <> was not healed",
                });
            case "win":
                return Race({ race: props?.raceName });
            case "lose":
                return Race({ race: props?.raceName, text: "Lose the" });
            case "win_all":
                return RaceMulti({ races: props?.raceList });
            case "win_any":
                return RaceMulti({
                    races: props?.raceList,
                    text: "Win any of the following races:",
                });
            case "win_or":
                return RaceMulti({
                    races: props?.raceList,
                    text: "Win the",
                    divider: " or the ",
                });
            case "win_on_streak":
                return Race({
                    race: value?.toString(),
                    text: `Without breaking the win streak, win the`,
                });
            case "win_as_strat":
                return Race({
                    race: value?.toString(),
                    text: `Win the <> as a ${getStrategy(props?.strategy)}`,
                });
            case "win_as_not_strat":
                return Race({
                    race: value?.toString(),
                    text: `Win the <> with any style other than ${getStrategy(
                        props?.strategy
                    )}`,
                });
            case "race_w2":
                return Race({
                    race: value?.toString(),
                    text: `Win the <> twice`,
                });
            case "race_pn":
                return Race({
                    race: value?.toString(),
                    text: `Place ${getOrdinal(
                        props?.position
                    )} or better in the`,
                });
            case "participate":
                return Race({
                    race: props?.raceName,
                    text: "Run in the",
                });
            case "do_not_participate":
                return Race({
                    race: props?.raceName,
                    text: "Do not run in the",
                });
            case "beat_rival":
                return Race({
                    race: value?.toString(),
                    text: `Run in the <> and beat ${charName}`,
                });
            case "rival_draw":
                return Race({
                    race: value?.toString(),
                    text: `Both you and ${charName} lose the`,
                });
            case "lose_to_rival":
                return Race({
                    race: value?.toString(),
                    text: `Run in the <> and lose to ${charName}`,
                });
            case "triple_crown":
            case "triple_tiara":
            case "spring_triple_crown":
            case "autumn_triple_crown_senior":
            case "autumn_triple_crown_same_year":
                return RaceSeries({ tag });
            case "race_change":
                return Race({
                    race: value?.toString(),
                    text: `Objective race changed to`,
                });
            case "race_cancelled":
                return Race({
                    race: value?.toString(),
                    text: `Objective race <> cancelled`,
                });
            case "race_harder":
                return Race({
                    race: value?.toString(),
                    text: `Increased difficulty of `,
                });
            case "skill":
                return SkillText({ event: outcome });
            case "skill_random":
                return SkillTextRandom({ eventHints: props?.eventHints });
            case "conditions":
                return props?.conditions?.map((con) => (
                    <EventText outcome={con} prefix="※" charID={charID} />
                ));
            default:
                return (
                    <span style={{ color: textColor }}>
                        {getEventText({ event: outcome, characters, charID })}
                    </span>
                );
        }
    }

    return (
        <>
            <TextStyled variant="body2-styled">
                {`${prefix} `}
                {renderEventText(tag)}
            </TextStyled>
        </>
    );
}

export default EventText;
