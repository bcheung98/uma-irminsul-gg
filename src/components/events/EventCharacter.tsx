// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack, LinearProgress } from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";
import { selectUnreleasedContent } from "reducers/settings";
import { eventMisc, eventsCommon, eventSlowMetabolism } from "data/events";

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
    const showUnreleased = useAppSelector(selectUnreleasedContent);
    const loadedEvents = objectKeys(events);

    let characterEvents: EventData | undefined;
    let outfitEvents: TrainingEvent[] | undefined = [];
    let eventsWithChoices: TrainingEvent[] = [];
    let recEvents: TrainingEvent[] | undefined = [];
    let secretEvents: TrainingEvent[] | undefined = [];
    let otherEvents: TrainingEvent[] = [];

    const getOptions = (event: TrainingEvent) => {
        if (character.release.global === "" || showUnreleased) {
            return event.optionsJP || event.options;
        } else {
            return event.options;
        }
    };

    const showEvent = (event: TrainingEvent) => {
        if (character.release.global === "" || showUnreleased) {
            return true;
        } else {
            return event.name !== "";
        }
    };

    function renderEventInfo({
        index,
        event,
        expand,
    }: {
        index: number;
        event: TrainingEvent;
        expand: boolean;
    }) {
        const e = { ...event };
        e.options = getOptions(event);
        return showEvent(event) ? (
            <EventInfo
                key={index}
                event={e}
                expand={expand}
                charID={character.charID}
            />
        ) : null;
    }

    if (loadedEvents.includes("character")) {
        characterEvents = events["character"].find(
            (char) => char.id === character.charID
        );
        if (characterEvents) {
            eventsWithChoices = characterEvents.events.filter(
                (event) => getOptions(event).length > 1
            );
            eventsWithChoices.push(
                eventSlowMetabolism({ props: characterEvents.props })
            );
            recEvents = characterEvents.props?.recEvents;
            secretEvents = characterEvents.props?.secretEvents.filter(
                (event) => getOptions(event).length > 0
            );
            eventMisc({ props: characterEvents.props }).map((event) =>
                otherEvents.push(event)
            );
            characterEvents.events
                .filter((event) => getOptions(event).length == 1)
                .map((event) => otherEvents.push(event));
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

    return characterEvents ? (
        <Stack spacing={2}>
            {outfitEvents && outfitEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Outfit Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {outfitEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {eventsWithChoices && eventsWithChoices.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Character Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {eventsWithChoices.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {recEvents && recEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>
                        Recreation Events
                    </TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {recEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {secretEvents && secretEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Secret Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {secretEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {characterEvents && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Special Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {eventsCommon({
                            props: characterEvents.props,
                        }).map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {otherEvents && otherEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Other Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {otherEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
        </Stack>
    ) : (
        <LinearProgress color="info" />
    );
}

export default EventCharacter;
