import { BaseSyntheticEvent, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import DeckCharacterCard from "./DeckCharacterCard";
import DeckSupportCard from "./DeckSupportCard";
import { FlexBox } from "styled/StyledBox";
import { TextStyled, Text } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    IconButton,
    Box,
    Stack,
    Button,
    Divider,
    Dialog,
    Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { copyDeck, selectDecks, setCurrentDeck } from "reducers/planner";

// Type imports
import { Deck } from "types/planner";

function CopyDeck({
    index,
    handleClose,
}: {
    index: number;
    handleClose: () => void;
}) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const decks = useAppSelector(selectDecks);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = (_: BaseSyntheticEvent, index: number) => {
        setCurrentIndex(index);
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleCopy = () => {
        dispatch(copyDeck(currentIndex));
        dispatch(setCurrentDeck(currentIndex));
        handleAlertClose();
        handleClose();
    };

    const renderDeck = (deck: Deck) => (
        <FlexBox
            sx={{
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "flex-start",
                justifyContent: { xs: "center", md: "left" },
            }}
        >
            <DeckCharacterCard data={deck.character} mini />
            {deck.supports.slice(0, 6).map((card, idx) => (
                <DeckSupportCard key={idx} data={card} mini />
            ))}
        </FlexBox>
    );

    return (
        <>
            <Box sx={{ overflowY: "auto" }}>
                <MainContentBox
                    title="Copy Deck"
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleClose}
                            sx={{ color: theme.appbar.color }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    contentProps={{ padding: 2 }}
                >
                    <TextStyled sx={{ mb: "16px" }}>
                        Copy the current deck to another slot
                    </TextStyled>
                    <Stack spacing={1} divider={<Divider />}>
                        <Box>
                            {renderDeck(decks[index])}
                            <TextStyled variant="h4-styled">↓↓↓↓↓</TextStyled>
                        </Box>
                        {decks.map((deck, idx) => (
                            <Box key={idx}>
                                <TextStyled
                                    variant="body2-styled"
                                    sx={{ mb: "8px" }}
                                >
                                    {deck.name}
                                </TextStyled>
                                <FlexBox
                                    key={idx}
                                    sx={{
                                        flexWrap: "wrap",
                                        rowGap: "8px",
                                        columnGap: "16px",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        onClick={(e) => handleAlertOpen(e, idx)}
                                        variant="contained"
                                        color="info"
                                        disabled={index === idx}
                                        disableElevation
                                        disableRipple
                                        sx={{
                                            height: "32px",
                                            "&.Mui-disabled": {
                                                backgroundColor:
                                                    theme.palette.info.main,
                                                color: theme.text.primary,
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        Copy here
                                    </Button>
                                    {renderDeck(deck)}
                                </FlexBox>
                            </Box>
                        ))}
                    </Stack>
                </MainContentBox>
            </Box>
            <Dialog open={alertOpen} onClose={handleAlertClose}>
                <Card sx={{ p: 2 }}>
                    <Box sx={{ mb: 2 }}>
                        <TextStyled variant="h6" sx={{ mb: 1 }}>
                            Confirm Overwrite
                        </TextStyled>
                        <Text sx={{ color: theme.text.description }}>
                            {"Are you sure you want to overwrite "}
                            <span style={{ color: theme.text.highlight }}>
                                {decks[currentIndex].name}
                            </span>
                            {" with "}
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
                            onClick={handleAlertClose}
                            variant="contained"
                            color="error"
                            disableElevation
                            disableRipple
                            sx={{ height: "32px" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCopy}
                            variant="contained"
                            color="info"
                            disableElevation
                            disableRipple
                            sx={{ height: "32px" }}
                        >
                            Confirm
                        </Button>
                    </Stack>
                </Card>
            </Dialog>
        </>
    );
}

export default CopyDeck;
