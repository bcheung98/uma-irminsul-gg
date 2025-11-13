// Component imports
import EventConditions from "./EventConditions";
import EventOptions from "./EventOptions";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacterProfiles } from "reducers/characterProfiles";
import { getScenarioLink, trainingEventContents } from "helpers/getEventText";

// Type imports
import { Event } from "types/event";

function EventPopup({
    name,
    event,
    charID,
}: {
    name: string;
    event: Event;
    charID: number | string;
}) {
    const theme = useTheme();

    const { options, conditions, altOutcome, scenarioLink, relevantChar } =
        event;

    const hasConditions = conditions && conditions?.length > 0;

    const headers: string[] = [];
    if (event.headers) {
        event.headers.forEach((header) =>
            headers.push(trainingEventContents[header])
        );
    }
    if (relevantChar) {
        const character = useAppSelector(selectCharacterProfiles).find(
            (character) => character.id === relevantChar
        );
        headers.push(`※ ${character?.name}` || "");
    }

    return (
        <Box
            sx={{
                p: "8px",
                minWidth: "150px",
                maxWidth: "300px",
                backgroundColor: theme.background(0, "light"),
            }}
        >
            <TextStyled
                variant="body2-styled"
                sx={{
                    mb: hasConditions ? "16px" : "4px",
                }}
            >
                {name}
            </TextStyled>
            {headers.length > 0 && <EventHeaders headers={headers} />}
            <Stack spacing={2}>
                {hasConditions && <EventConditions conditions={conditions} />}
                <Box>
                    {hasConditions && (
                        <TextStyled variant="body2-styled" sx={{ mb: "4px" }}>
                            Rewards:
                        </TextStyled>
                    )}
                    <Stack spacing={1}>
                        {options.length > 0 ? (
                            <EventOptions options={options} charID={charID} />
                        ) : (
                            <Stack
                                sx={{
                                    p: "8px",
                                    borderRadius: "4px",
                                    backgroundColor: theme.background(1),
                                }}
                            >
                                <TextStyled variant="body2-styled">
                                    Nothing happens
                                </TextStyled>
                            </Stack>
                        )}
                        {altOutcome && (
                            <>
                                <TextStyled variant="body2-styled">
                                    ※ Alternate outcome
                                </TextStyled>
                                <EventOptions
                                    options={altOutcome}
                                    charID={charID}
                                />
                            </>
                        )}
                        {scenarioLink && (
                            <TextStyled variant="body2-styled">
                                {getScenarioLink(scenarioLink)}
                            </TextStyled>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

export default EventPopup;

function EventHeaders({ headers }: { headers: string[] }) {
    return headers.map((header, index) => (
        <TextStyled key={index} variant="body2-styled" sx={{ mb: "4px" }}>
            {header}
        </TextStyled>
    ));
}
