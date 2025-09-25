// Component imports
import EventText from "./EventText";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack } from "@mui/material";

// Helper imports
import { getOptionTag } from "helpers/getEventOptionTag";
import { trainingEventContents } from "helpers/getEventText";

// Type imports
import { TrainingEvent, TrainingEventExtraProps } from "types/event";

function EventPopup({ name, event }: { name: string; event: TrainingEvent }) {
    const theme = useTheme();

    const { options, conditions, chances, props } = event;

    const getRandomText = (index: number, idx: number) => {
        if (chances) {
            return idx === 0
                ? `Randomly either (~${chances[index][idx]}%)`
                : `or (~${chances[index][idx]}%)`;
        } else {
            return idx === 0 ? "Randomly either" : "or";
        }
    };

    const hasConditions = conditions && conditions?.length > 0;

    const headers: string[] = [];
    props &&
        Object.keys(trainingEventContents).forEach((e) => {
            if (props[e as keyof TrainingEventExtraProps]) {
                headers.push(trainingEventContents[e]);
            }
        });

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
                    mb: hasConditions || headers.length > 0 ? "16px" : "4px",
                }}
            >
                {name}
            </TextStyled>
            <Stack spacing={2}>
                {hasConditions && (
                    <Box sx={{ color: theme.text.primary }}>
                        <TextStyled variant="body2-styled">
                            Conditions:
                        </TextStyled>
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
                )}
                {headers.length > 0 &&
                    headers.map((header, index) => (
                        <TextStyled key={index} variant="body2-styled">
                            {header}
                        </TextStyled>
                    ))}
                <Box>
                    {hasConditions && (
                        <TextStyled variant="body2-styled" sx={{ mb: "4px" }}>
                            Rewards:
                        </TextStyled>
                    )}
                    <Stack spacing={1}>
                        {options.length > 0 ? (
                            options.map((option, index) => (
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
                                            {getOptionTag(
                                                index + 1,
                                                options.length
                                            )}
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
                                                            color: theme.text
                                                                .highlight,
                                                        }}
                                                    >
                                                        {getRandomText(
                                                            index,
                                                            idx
                                                        )}
                                                    </TextStyled>
                                                )}
                                                <Stack>
                                                    {opt.map((outcome, i) => (
                                                        <Box key={i}>
                                                            <EventText
                                                                outcome={
                                                                    outcome
                                                                }
                                                            />
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Stack>
                            ))
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
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

export default EventPopup;
