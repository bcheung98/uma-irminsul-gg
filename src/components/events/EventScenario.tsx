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
import { selectUnreleasedContent } from "reducers/settings";

// Type imports
import { EventData, TrainingEvent } from "types/event";
import { Scenario } from "types/scenario";

function EventScenario({
    scenario,
    expand = true,
}: {
    scenario: Scenario;
    expand?: boolean;
}) {
    const events = useAppSelector(selectEvents);
    const showUnreleased = useAppSelector(selectUnreleasedContent);
    const loadedEvents = objectKeys(events);

    let scenarioEvents: EventData | undefined;
    let eventsWithChoices: TrainingEvent[] = [];
    let otherEvents: TrainingEvent[] = [];

    const getOptions = (event: TrainingEvent) => {
        if (showUnreleased || !scenario.global) {
            return event.optionsJP || event.options;
        } else {
            return event.options;
        }
    };

    const showEvent = (event: TrainingEvent) => {
        if (showUnreleased || !scenario.global) {
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
            <EventInfo key={index} event={e} expand={expand} />
        ) : null;
    }

    if (loadedEvents.includes("scenario")) {
        scenarioEvents = events["scenario"].find((s) => s.id === scenario.id);
        if (scenarioEvents) {
            eventsWithChoices = scenarioEvents.events.filter(
                (event) =>
                    getOptions(event).length > 1 || event.props?.hasChoices
            );
            otherEvents = scenarioEvents.events.filter(
                (event) =>
                    getOptions(event).length === 1 && !event.props?.hasChoices
            );
        }
    }

    const flexBoxStyle = {
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: "16px",
    };

    return (
        <Stack spacing={2}>
            {eventsWithChoices && eventsWithChoices.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Scenario Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {eventsWithChoices.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {otherEvents && otherEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Random Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {otherEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
        </Stack>
    );
}

export default EventScenario;
