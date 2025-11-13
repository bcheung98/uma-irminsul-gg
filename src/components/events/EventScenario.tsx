// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";

// Type imports
import { Event, ScenarioEvents } from "types/event";
import { Scenario } from "types/scenario";

function EventScenario({
    scenario,
    expand = true,
}: {
    scenario: Scenario;
    expand?: boolean;
}) {
    const events = useAppSelector(selectEvents);

    let scenarioEvents: ScenarioEvents | undefined;
    let eventsWithChoices: Event[] | undefined = [];
    let otherEvents: Event[] | undefined = [];

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
            <EventInfo key={index} event={event} expand={expand} charID={0} />
        );
    }

    scenarioEvents = events["scenario"].find((s) => s.id === scenario.id);
    if (scenarioEvents) {
        eventsWithChoices = scenarioEvents.events.scenario;
        otherEvents = scenarioEvents.events.random;
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
