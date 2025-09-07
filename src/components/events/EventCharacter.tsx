// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack } from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";
import {
    eventMasterTrainer,
    eventMisc,
    eventsCommon,
    eventSlowMetabolism,
} from "data/events";

// Type imports
import { Character } from "types/character";
import { EventData, TrainingEvent } from "types/event";

function EventCharacter({
    character,
    expand = true,
}: {
    character: Character;
    expand?: boolean;
}) {
    const events = useAppSelector(selectEvents);
    const loadedEvents = objectKeys(events);

    let characterEvents: EventData | undefined;
    let outfitEvents: TrainingEvent[] | undefined = [];
    let eventsWithChoices: TrainingEvent[] = [];
    let recEvents: TrainingEvent[] | undefined = [];
    let otherEvents: TrainingEvent[] = [];

    if (loadedEvents.includes("character")) {
        characterEvents = events["character"].find(
            (char) => char.id === Number(character.id.toString().slice(0, 4))
        );
        if (characterEvents) {
            eventsWithChoices = characterEvents.events.filter(
                (event) => event.options.length > 1
            );
            eventsWithChoices.push(
                eventSlowMetabolism({ props: characterEvents.props })
            );
            recEvents = characterEvents.props?.recEvents;
            otherEvents = characterEvents.events.filter(
                (event) => event.options.length <= 1
            );
            otherEvents.unshift(
                eventMasterTrainer({ props: characterEvents.props })
            );
            eventMisc({ props: characterEvents.props }).map((event) =>
                otherEvents.push(event)
            );
        }
    }

    if (loadedEvents.includes("character-outfit")) {
        outfitEvents = events["character-outfit"].find(
            (char) => char.id === character.id
        )?.events;
    }

    const flexBoxStyle = {
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: "16px",
    };

    return (
        <Stack spacing={2}>
            {outfitEvents && outfitEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Outfit Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {outfitEvents.map((event, index) => (
                            <EventInfo
                                key={index}
                                event={event}
                                expand={expand}
                            />
                        ))}
                    </FlexBox>
                </>
            )}
            {eventsWithChoices && eventsWithChoices.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Character Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {eventsWithChoices.map((event, index) => (
                            <EventInfo
                                key={index}
                                event={event}
                                expand={expand}
                            />
                        ))}
                    </FlexBox>
                </>
            )}
            {recEvents && recEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>
                        Recreation Events
                    </TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {recEvents.map((event, index) => (
                            <EventInfo
                                key={index}
                                event={event}
                                expand={expand}
                            />
                        ))}
                    </FlexBox>
                </>
            )}
            {characterEvents && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Special Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {eventsCommon({
                            props: characterEvents.props,
                        }).map((event, index) => (
                            <EventInfo
                                key={index}
                                event={event}
                                expand={expand}
                            />
                        ))}
                    </FlexBox>
                </>
            )}
            {otherEvents && otherEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Other Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {otherEvents.map((event, index) => (
                            <EventInfo
                                key={index}
                                event={event}
                                expand={expand}
                            />
                        ))}
                    </FlexBox>
                </>
            )}
        </Stack>
    );
}

export default EventCharacter;
