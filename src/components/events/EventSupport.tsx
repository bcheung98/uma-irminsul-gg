// Component imports
import EventInfo from "components/events/EventInfo";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectEvents } from "reducers/event";
import { selectCharacterProfiles } from "reducers/characterProfiles";
import { objectKeys } from "helpers/utils";

// Type imports
import { SupportProps } from "types/support";
import { EventData } from "types/event";

function EventSupport({ support }: SupportProps) {
    const profiles = useAppSelector(selectCharacterProfiles);

    const ranks = ["r", "sr", "ssr"] as const;
    const rarity = ranks[support.rarity - 3];

    const events = useAppSelector(selectEvents);
    const loadedEvents = objectKeys(events);

    let commonEvents: EventData | undefined;
    let chainEvents: EventData | undefined;

    const isPalorGroup = ["Pal", "Group"].includes(support.specialty);

    if (loadedEvents.includes("support-common")) {
        const character = profiles.find((char) => char.name === support.name);
        if (character) {
            commonEvents = events["support-common"].find(
                (e) => e.id === character.id
            );
        }
    }

    if (isPalorGroup && loadedEvents.includes("support-pal")) {
        const character = profiles.find((char) => char.name === support.name);
        if (character) {
            commonEvents = events["support-pal"].find(
                (e) => e.id === character.id
            );
            chainEvents = commonEvents;
        }
    } else {
        if (loadedEvents.includes(`support-${rarity}`)) {
            chainEvents = events[`support-${rarity}`].find(
                (e) => e.id === support.id
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
            {chainEvents && chainEvents.events.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>
                        {`${isPalorGroup ? "Recreation" : "Chain"} Events`}
                    </TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {isPalorGroup
                            ? chainEvents.palProps?.recEvents.map(
                                  (event, index) => (
                                      <EventInfo
                                          key={index}
                                          event={event}
                                          isChain={true}
                                          index={index + 1}
                                      />
                                  )
                              )
                            : chainEvents.events.map((event, index) => (
                                  <EventInfo
                                      key={index}
                                      event={event}
                                      isChain={true}
                                      index={index + 1}
                                  />
                              ))}
                    </FlexBox>
                </>
            )}
            {commonEvents && commonEvents.events.length > 0 && (
                <>
                    <TextStyled sx={{ mb: "8px" }}>Random Events</TextStyled>
                    <FlexBox sx={flexBoxStyle}>
                        {commonEvents.events.map((event, index) => (
                            <EventInfo key={index} event={event} />
                        ))}
                    </FlexBox>
                </>
            )}
        </Stack>
    );
}

export default EventSupport;
