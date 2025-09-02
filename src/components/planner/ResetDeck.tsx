// Component imports
import { TextStyled, Text } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack, Button, Card } from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { resetDeck, selectDecks } from "reducers/planner";

function ResetDeck({
    index,
    handleClose,
}: {
    index: number;
    handleClose: () => void;
}) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const decks = useAppSelector(selectDecks);

    const handleReset = () => {
        dispatch(resetDeck(index));
        handleClose();
    };

    return (
        <Card sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <TextStyled variant="h6" sx={{ mb: 1 }}>
                    Confirm Deck Reset
                </TextStyled>
                <Text sx={{ color: theme.text.description }}>
                    {"Are you sure you want to reset the contents of "}
                    <span style={{ color: theme.text.value }}>
                        {decks[index].name}
                    </span>
                    {"?"}
                </Text>
            </Box>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="right"
            >
                <Button
                    onClick={handleClose}
                    variant="contained"
                    color="primary"
                    disableElevation
                    disableRipple
                    sx={{ height: "32px" }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleReset}
                    variant="contained"
                    color="error"
                    disableElevation
                    disableRipple
                    sx={{ height: "32px" }}
                >
                    Reset
                </Button>
            </Stack>
        </Card>
    );
}

export default ResetDeck;
