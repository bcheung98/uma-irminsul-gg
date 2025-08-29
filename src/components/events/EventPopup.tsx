// Component imports
import EventText from "./EventText";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";

// Helper imports
import { getOptionTag } from "helpers/getEventOptionTag";

// Type imports
import { EventOutcome } from "types/event";

function EventPopup({
    name,
    options,
    props,
}: {
    name: string;
    options: EventOutcome[][][];
    optionsJP?: EventOutcome[][][];
    props?: number[][];
}) {
    const theme = useTheme();

    const getRandomText = (index: number, idx: number) => {
        if (props) {
            return idx === 0
                ? `Randomly either (~${props[index][idx]}%)`
                : `or (~${props[index][idx]}%)`;
        } else {
            return idx === 0 ? "Randomly either" : "or";
        }
    };

    return (
        <Box sx={{ p: "8px", backgroundColor: theme.background(0, "light") }}>
            <TextStyled variant="body2-styled" sx={{ mb: "4px" }}>
                {name}
            </TextStyled>
            <Stack spacing={1}>
                {options.map((option, index) => (
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
                                                <EventText outcome={outcome} />
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
}

export default EventPopup;
