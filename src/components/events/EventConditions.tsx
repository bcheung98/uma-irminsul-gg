// Component imports
import EventText from "./EventText";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Type imports
import { EventOutcome } from "types/event";

function EventConditions({ conditions }: { conditions: EventOutcome[] }) {
    const theme = useTheme();

    return (
        <Box sx={{ color: theme.text.primary }}>
            <TextStyled variant="body2-styled">Conditions:</TextStyled>
            <Box>
                <ul>
                    {conditions.map((con, index) => (
                        <li key={index}>
                            <EventText outcome={con} />
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}

export default EventConditions;
