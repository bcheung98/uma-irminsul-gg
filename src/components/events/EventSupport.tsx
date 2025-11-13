// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack, LinearProgress } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";

// Type imports
import { Support } from "types/support";
import { SupportEvents, Event, PalGroupEvents } from "types/event";

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

    let supportEvents: SupportEvents | PalGroupEvents | undefined;
    let chainEvents: Event[] | undefined = [];
    let randomEvents: Event[] | undefined = [];
    let specialEvents: Event[] | undefined = [];

    const isPalorGroup = ["Pal", "Group"].includes(support.specialty);

    function renderEventInfo({
        index,
        event,
        isChain = false,
        expand,
    }: {
        index: number;
        event: Event;
        isChain?: boolean;
        expand: boolean;
    }) {
        return (
            <EventInfo
                key={index}
                event={event}
                isChain={isChain}
                index={index}
                expand={expand}
                charID={
                    support.specialty === "Group"
                        ? support.name
                        : support.charID
                }
            />
        );
    }

    function addHeadersPal(event: Event, index: number) {
        const headers = [];
        if (index === 0) {
            headers.push("first_training");
        }
        if (index === 1) {
            headers.push("after_training");
        }
        if (index === 2) {
            headers.push("after_finals_bond_maxed");
        }
        if (index === 3) {
            headers.push("after_finals_bond_not_maxed");
        }
        if (index === 4) {
            headers.push("new_year_dating");
        }
        return {
            ...event,
            headers: headers,
        };
    }

    if (isPalorGroup) {
        if (support.specialty === "Pal") {
            supportEvents = events["support-pal"].find(
                (e) => e.id === support.charID
            );
            if (supportEvents) {
                chainEvents = supportEvents.events.recreation;
                randomEvents = supportEvents.events.random;
                specialEvents = supportEvents.events.special?.map(
                    (event, index) => addHeadersPal(event, index)
                );
            }
        } else if (support.specialty === "Group") {
            supportEvents = events["support-group"].find(
                (e) => e.id === support.id
            );
            if (supportEvents) {
                chainEvents = supportEvents.events.recreation;
                randomEvents = supportEvents.events.random;
                specialEvents = supportEvents.events.special;
            }
        }
    } else {
        supportEvents = events["support-common"].find(
            (e) => e.id === support.charID
        );
        if (supportEvents) {
            randomEvents = supportEvents.events.common;
        }
        if (rarity !== "r") {
            chainEvents = events[`support-${rarity}`].find(
                (e) => e.id === support.id
            )?.events.chain;
        }
    }

    const flexBoxStyle = {
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: "16px",
    };

    return supportEvents ? (
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
                                isChain: support.specialty !== "Group",
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
    ) : (
        <LinearProgress color="info" />
    );
}

export default EventSupport;
