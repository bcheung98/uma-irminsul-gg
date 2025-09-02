import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import DeckCharacterCard from "./DeckCharacterCard";
import DeckScenarioCard from "./DeckScenarioCard";
import DeckSupportCard from "./DeckSupportCard";
import DeckSearch from "./DeckSearch";
import DeckActions from "./DeckActions";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledTabs, StyledTab, TabPanel } from "styled/StyledTabs";

// MUI imports
import { useTheme, useMediaQuery, Divider, Box, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectCurrentDeckIndex,
    selectDecks,
    setCurrentDeck,
} from "reducers/planner";

// Type imports
import { CardType } from "types/planner";

function DeckBuilder() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const decks = useAppSelector(selectDecks);
    const currentDeck = useAppSelector(selectCurrentDeckIndex);

    const [tabValue, setTabValue] = useState(currentDeck);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        dispatch(setCurrentDeck(newValue));
    };

    const [supportIndex, setSupportIndex] = useState(0);

    const [open, setOpen] = useState(false);
    const [cardType, setCardType] = useState<CardType>();
    const handleClickOpen = (
        _: BaseSyntheticEvent,
        type: CardType,
        index = 0
    ) => {
        setOpen(true);
        setCardType(type);
        if (type === "support") {
            setSupportIndex(index);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    const flexBoxParams = {
        flexWrap: "wrap",
        gap: "16px",
        alignItems: "flex-start",
        justifyContent: { xs: "center", md: "left" },
    };

    useEffect(() => {
        setTabValue(currentDeck);
    }, [decks, tabValue]);

    return (
        <>
            <MainContentBox
                title={
                    <StyledTabs
                        variant="scrollable"
                        value={tabValue}
                        onChange={handleTabChange}
                        scrollButtons="auto"
                        allowScrollButtonsMobile={!matches_md_up}
                        sx={{
                            height: "100%",
                            "& .MuiTabScrollButton-root": {
                                color: theme.text.primary,
                                backgroundColor: theme.background(2),
                            },
                            ".MuiTabs-scrollButtons.Mui-disabled": {
                                opacity: 0.3,
                            },
                            "& .MuiTabs-indicatorSpan": {
                                width: "100%",
                                backgroundColor: theme.border.color.primary,
                            },
                        }}
                    >
                        {decks.map((_, index) => (
                            <StyledTab
                                key={index}
                                label={<TextStyled>{index + 1}</TextStyled>}
                                sx={{ p: 0 }}
                            />
                        ))}
                    </StyledTabs>
                }
                headerProps={{ padding: 0, dense: true }}
                contentProps={{ padding: "16px" }}
            >
                {decks.map((deck, index) => (
                    <TabPanel
                        key={index}
                        index={index}
                        value={tabValue}
                        padding={0}
                    >
                        <TextStyled
                            variant="h6-styled"
                            sx={{
                                mb: "16px",
                                textAlign: { xs: "center", md: "left" },
                            }}
                        >
                            {deck.name}
                        </TextStyled>
                        <Grid
                            container
                            spacing={2}
                            justifyContent={{ xs: "center", md: "left" }}
                        >
                            <Grid size={{ xs: 12, md: "auto" }}>
                                <FlexBox sx={flexBoxParams}>
                                    <Box
                                        onClick={(e) =>
                                            handleClickOpen(e, "character")
                                        }
                                    >
                                        <DeckCharacterCard
                                            data={deck.character}
                                        />
                                    </Box>
                                    <Box
                                        onClick={(e) =>
                                            handleClickOpen(e, "scenario")
                                        }
                                    >
                                        <DeckScenarioCard
                                            data={deck.scenario}
                                        />
                                    </Box>
                                </FlexBox>
                            </Grid>
                            <Grid size={{ xs: 12, md: "auto" }}>
                                <Divider
                                    orientation={
                                        matches_md_up
                                            ? "vertical"
                                            : "horizontal"
                                    }
                                />
                            </Grid>
                            <Grid size="grow">
                                <FlexBox sx={flexBoxParams}>
                                    <FlexBox sx={flexBoxParams}>
                                        {deck.supports
                                            .slice(0, 3)
                                            .map((card, idx) => (
                                                <Box
                                                    key={idx}
                                                    onClick={(e) =>
                                                        handleClickOpen(
                                                            e,
                                                            "support",
                                                            idx
                                                        )
                                                    }
                                                >
                                                    <DeckSupportCard
                                                        data={card}
                                                    />
                                                </Box>
                                            ))}
                                    </FlexBox>
                                    <FlexBox sx={flexBoxParams}>
                                        {deck.supports
                                            .slice(3, 6)
                                            .map((card, idx) => (
                                                <Box
                                                    key={idx}
                                                    onClick={(e) =>
                                                        handleClickOpen(
                                                            e,
                                                            "support",
                                                            idx + 3
                                                        )
                                                    }
                                                >
                                                    <DeckSupportCard
                                                        data={card}
                                                    />
                                                </Box>
                                            ))}
                                    </FlexBox>
                                </FlexBox>
                            </Grid>
                        </Grid>
                    </TabPanel>
                ))}
                <DeckActions />
            </MainContentBox>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                disableScrollLock
            >
                <DeckSearch
                    deck={decks[tabValue]}
                    type={cardType}
                    index={supportIndex}
                    handleClose={handleClose}
                />
            </Dialog>
        </>
    );
}

export default DeckBuilder;
