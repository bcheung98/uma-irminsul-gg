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
import { Support } from "types/support";
import { EventData, TrainingEvent } from "types/event";

function EventSupport({
    support,
    expand = true,
}: {
    support: Support;
    expand?: boolean;
}) {
    const ranks = ["r", "sr", "ssr"] as const;
    const rarity = ranks[support.rarity - 3];

    const events = useAppSelector(selectEvents);
    const showUnreleased = useAppSelector(selectUnreleasedContent);
    const loadedEvents = objectKeys(events);

    let commonEvents: EventData | undefined;
    let chainEvents: EventData | undefined;

    const isPalorGroup = ["Pal", "Group"].includes(support.specialty);

    const getOptions = (event: TrainingEvent) => {
        if (support.release.global === "" || showUnreleased) {
            return event.optionsJP || event.options;
        } else {
            return event.options;
        }
    };

    const showEvent = (event: TrainingEvent) => {
        if (support.release.global === "" || showUnreleased) {
            return true;
        } else {
            return event.name !== "";
        }
    };

    function renderEventInfo({
        index,
        event,
        isChain = false,
        expand,
    }: {
        index: number;
        event: TrainingEvent;
        isChain?: boolean;
        expand: boolean;
    }) {
        const e = { ...event };
        e.options = getOptions(event);
        return showEvent(event) ? (
            <EventInfo
                key={index}
                event={e}
                isChain={isChain}
                index={index}
                expand={expand}
            />
        ) : null;
    }

    if (loadedEvents.includes("support-common")) {
        commonEvents = events["support-common"].find(
            (e) => e.id === support.charID
        );
    }
    if (isPalorGroup && loadedEvents.includes("support-pal")) {
        commonEvents = events["support-pal"].find(
            (e) => e.id === support.charID
        );
        chainEvents = commonEvents;
    } else {
        if (loadedEvents.includes(`support-${rarity}`)) {
            chainEvents = events[`support-${rarity}`].find(
                (e) => e.id === support.id
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
            {chainEvents && chainEvents.events.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>
                        {`${isPalorGroup ? "Recreation" : "Chain"} Events`}
                    </TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {isPalorGroup
                            ? chainEvents.palProps?.recEvents.map(
                                  (event, index) =>
                                      renderEventInfo({
                                          index,
                                          event,
                                          expand,
                                          isChain: true,
                                      })
                              )
                            : chainEvents.events.map((event, index) =>
                                  renderEventInfo({
                                      index,
                                      event,
                                      expand,
                                      isChain: true,
                                  })
                              )}
                    </FlexBox>
                </>
            )}
            {commonEvents && commonEvents.events.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Random Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {commonEvents.events.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
        </Stack>
    );
}

export default EventSupport;
