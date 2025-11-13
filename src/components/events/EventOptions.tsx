// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack } from "@mui/material";

// Helper imports
import { getOptionTag } from "helpers/getEventOptionTag";

// Type imports
import type { EventOptions } from "types/event";
import EventRewards from "./EventRewards";

function EventOptions({
    options,
    charID,
}: {
    options: EventOptions[];
    charID: number | string;
}) {
    const theme = useTheme();

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
                <EventRewards
                    charID={charID}
                    rewards={option.rewards}
                    chances={option.chances}
                />
            </Stack>
        </Stack>
    ));
}

export default EventOptions;
