// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";
import { objectKeys } from "helpers/utils";

// Type imports
import { EventData, TrainingEvent } from "types/event";
import { Scenario } from "data/scenarios";

function EventScenario({ scenario }: { scenario: Scenario }) {
    const events = useAppSelector(selectEvents);
    const loadedEvents = objectKeys(events);

    let scenarioEvents: EventData | undefined;
    let eventsWithChoices: TrainingEvent[] = [];
    let otherEvents: TrainingEvent[] = [];

    if (loadedEvents.includes("scenario")) {
        scenarioEvents = events["scenario"].find((s) => s.id === scenario.id);
        if (scenarioEvents) {
            eventsWithChoices = scenarioEvents.events.filter(
                (event) => event.options.length > 1
            );
            otherEvents = scenarioEvents.events.filter(
                (event) => event.options.length === 1
            );
        }
    }

    const flexBoxStyle = {
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px",
    };

    return (
        <Stack spacing={2}>
            {eventsWithChoices && eventsWithChoices.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Scenario Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {eventsWithChoices.map((event, index) => (
                            <EventInfo key={index} event={event} />
                        ))}
                    </FlexBox>
                </>
            )}
            {otherEvents && otherEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Random Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {otherEvents.map((event, index) => (
                            <EventInfo key={index} event={event} />
                        ))}
                    </FlexBox>
                </>
            )}
        </Stack>
    );
}

export default EventScenario;
