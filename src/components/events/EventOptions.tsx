// Component imports
import EventText from "./EventText";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";

// Helper imports
import { getOptionTag } from "helpers/getEventOptionTag";

// Type imports
import { TrainingEvent, EventOutcome } from "types/event";

function EventOptions({
    event,
    options,
    charID,
}: {
    event: TrainingEvent;
    options: EventOutcome[][][];
    charID: number | string;
}) {
    const theme = useTheme();

    const { chances } = event;

    const getRandomText = (index: number, idx: number) => {
        if (chances) {
            return idx === 0
                ? `Randomly either (~${chances[index][idx]}%)`
                : `or (~${chances[index][idx]}%)`;
        } else {
            return idx === 0 ? "Randomly either" : "or";
        }
    };

    return options.map((option, index) => (
        <Stack
            spacing={1}
            key={index}
            sx={{
                p: "8px",
                borderRadius: "4px",
                backgroundColor: theme.background(1),
            }}
        >
            {options.length > 1 && (
                <TextStyled variant="body2-styled">
                    {getOptionTag(index + 1, options.length)}
                </TextStyled>
            )}
            <Stack spacing={1}>
                {option.map((opt, idx) => (
                    <Box key={idx}>
                        {option.length > 1 && (
                            <TextStyled
                                variant="body2-styled"
                                sx={{
                                    mb: "8px",
                                    color: theme.text.highlight,
                                }}
                            >
                                {getRandomText(index, idx)}
                            </TextStyled>
                        )}
                        <Stack>
                            {opt.map((outcome, i) => (
                                <Box key={i}>
                                    <EventText
                                        outcome={outcome}
                                        charID={charID}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Stack>
    ));
}

export default EventOptions;
