// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack, LinearProgress } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";
import { eventMisc, eventsCommon, eventSlowMetabolism } from "data/events";

// Type imports
import { Character } from "types/character";
import { CharacterEvents, Event } from "types/event";

function EventCharacter({
    character,
    expand = true,
}: {
    character: Character;
    expand?: boolean;
}) {
    const eventData = useAppSelector(selectEvents);

    let characterEvents: CharacterEvents | undefined;
    let outfitEvents: Event[] | undefined = [];
    let eventsWithChoices: Event[] | undefined = [];
    let recEvents: Event[] | undefined = [];
    let secretEvents: Event[] | undefined = [];
    let otherEvents: Event[] = [];

    function renderEventInfo({
        index,
        event,
        expand,
    }: {
        index: number;
        event: Event;
        expand: boolean;
    }) {
        return (
            <EventInfo
                key={index}
                event={event}
                expand={expand}
                charID={character.charID}
            />
        );
    }

    characterEvents = eventData["character"].find(
        (event) => event.id === character.charID
    );
    if (characterEvents) {
        eventsWithChoices = characterEvents.events.character?.filter(
            (event) => event.options.length > 1 || event.forceHasChoices
        );
        eventsWithChoices?.push(
            eventSlowMetabolism({ props: characterEvents.props })
        );
        recEvents = characterEvents.events.recreation;
        secretEvents = characterEvents.events.secret;
        eventMisc({ props: characterEvents.props }).forEach((event) =>
            otherEvents.push(event)
        );
        characterEvents.events.character
            ?.filter((event) => {
                if (
                    event.forceHasChoices !== undefined &&
                    !event.forceHasChoices
                ) {
                    return true;
                }
                return event.options.length == 1;
            })
            .forEach((event) => otherEvents.push(event));
    }

    outfitEvents = eventData["character-outfit"].find(
        (char) => char.id === character.id
    )?.events.outfit;

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
