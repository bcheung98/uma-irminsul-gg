// Component imports
import EventOptions from "./EventOptions";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";

// Helper imports
import { trainingEventContents } from "helpers/getEventText";

// Type imports
import { TrainingEvent } from "types/event";
import EventConditions from "./EventConditions";

function EventPopup({ name, event }: { name: string; event: TrainingEvent }) {
    const theme = useTheme();

    const { options, conditions, props } = event;

    const hasConditions = conditions && conditions?.length > 0;

    const headers: string[] = [];
    if (props?.headers) {
        props.headers.forEach((header) =>
            headers.push(trainingEventContents[header])
        );
    }

    return (
        <Box
            sx={{
                p: "8px",
                minWidth: "150px",
                maxWidth: "400px",
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
                            <EventOptions event={event} options={options} />
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
                        {props?.altOutcome && (
                            <>
                                <TextStyled variant="body2-styled">
                                    ※ Alternate outcome
                                </TextStyled>
                                <EventOptions
                                    event={event}
                                    options={props.altOutcome}
                                />
                            </>
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
