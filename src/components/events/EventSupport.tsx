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

    let supportEvents: EventData | undefined;
    let chainEvents: TrainingEvent[] | undefined = [];
    let randomEvents: TrainingEvent[] | undefined = [];
    let specialEvents: TrainingEvent[] | undefined = [];

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

    if (isPalorGroup && loadedEvents.includes("support-pal")) {
        supportEvents = events["support-pal"].find(
            (e) => e.id === support.charID
        );
        if (supportEvents) {
            chainEvents = supportEvents.palProps?.recEvents;
            supportEvents.events.forEach((event, index) => {
                const headers = [];
                if (index === 0) {
                    headers.push("first_training");
                }
                if (index === 1) {
                    headers.push("after_training");
                }
                if (index === 3) {
                    headers.push("after_finals_bond_maxed");
                }
                if (index === 4) {
                    headers.push("after_finals_bond_not_maxed");
                }
                if (index === 5) {
                    headers.push("new_year_dating");
                }
                const e = {
                    ...event,
                    props: { ...event.props, headers: headers },
                };
                if (index === 2 || index === 6) {
                    randomEvents?.push(e);
                } else {
                    specialEvents?.push(e);
                }
            });
            randomEvents = randomEvents.reverse();
        }
    } else {
        if (loadedEvents.includes("support-common")) {
            supportEvents = events["support-common"].find(
                (e) => e.id === support.charID
            );
            if (supportEvents) {
                randomEvents = supportEvents.events;
            }
        }
        if (loadedEvents.includes(`support-${rarity}`)) {
            chainEvents = events[`support-${rarity}`].find(
                (e) => e.id === support.id
            )?.events;
        }
    }

    const flexBoxStyle = {
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: "16px",
    };

    return (
        <Stack spacing={2}>
            {chainEvents && chainEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>
                        {`${isPalorGroup ? "Recreation" : "Chain"} Events`}
                    </TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {chainEvents.map((event, index) =>
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
            {randomEvents && randomEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Random Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {randomEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
            {specialEvents && specialEvents.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Special Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {specialEvents.map((event, index) =>
                            renderEventInfo({ index, event, expand })
                        )}
                    </FlexBox>
                </>
            )}
        </Stack>
    );
}

export default EventSupport;
