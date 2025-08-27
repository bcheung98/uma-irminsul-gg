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
}: {
    name: string;
    options: EventOutcome[][][];
    optionsJP?: EventOutcome[][][];
}) {
    const theme = useTheme();

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
                                            {idx === 0 ? "Randomly" : "or"}
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
