// Component imports
import MainContentBox from "custom/MainContentBox";

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
import EventInfo from "components/events/EventInfo";

function SupportEvents({ support }: SupportProps) {
    const profiles = useAppSelector(selectCharacterProfiles);

    const ranks = ["r", "sr", "ssr"] as const;
    const rarity = ranks[support.rarity - 3];

    const events = useAppSelector(selectEvents);
    const loadedEvents = objectKeys(events);

    let commonEvents: EventData | undefined;
    let chainEvents: EventData | undefined;

    if (loadedEvents.includes("support-common")) {
        const character = profiles.find((char) => char.name === support.name);
        if (character) {
            commonEvents = events["support-common"].find(
                (e) => e.id === character.id
            );
        }
    }

    if (loadedEvents.includes(`support-${rarity}`)) {
        chainEvents = events[`support-${rarity}`].find(
            (e) => e.id === support.id
        );
    }

    const flexBoxStyle = {
        flexWrap: "wrap",
        alignItems: "center",
        gap: "16px",
    };

    return (
        <MainContentBox
            title="Training Events"
            contentProps={{ padding: "16px" }}
        >
            <Stack spacing={2}>
                {chainEvents && chainEvents.events.length > 0 && (
                    <>
                        <TextStyled sx={{ mb: "8px" }}>Chain Events</TextStyled>
                        <FlexBox sx={flexBoxStyle}>
                            {chainEvents.events.map((event, index) => (
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
                        <TextStyled sx={{ mb: "8px" }}>
                            Random Events
                        </TextStyled>
                        <FlexBox sx={flexBoxStyle}>
                            {commonEvents.events.map((event, index) => (
                                <EventInfo key={index} event={event} />
                            ))}
                        </FlexBox>
                    </>
                )}
            </Stack>
        </MainContentBox>
    );
}

export default SupportEvents;
