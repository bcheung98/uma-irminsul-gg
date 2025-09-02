import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import EventCharacter from "components/events/EventCharacter";
import EventScenario from "components/events/EventScenario";
import EventSupport from "components/events/EventSupport";
import EventSettings from "./EventSettings";
import EventSearch from "./EventSearch";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledTabs, StyledTab, TabPanel } from "styled/StyledTabs";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Box,
    IconButton,
    Dialog,
    Stack,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

// Helper imports
import { useAppSelector, useAppDispatch } from "helpers/hooks";
import {
    addSupport,
    selectCurrentDeck,
    selectSettings,
} from "reducers/planner";
import { selectCharacters } from "reducers/character";
import { selectSupports } from "reducers/support";
import { Scenario, scenarios } from "data/scenarios";

// Type imports
import { DeckData } from "types/planner";
import { Character } from "types/character";
import { Support } from "types/support";

function EventViewer() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);

    const characters = [...useAppSelector(selectCharacters)];
    const supports = [...useAppSelector(selectSupports)];

    const currentDeck = useAppSelector(selectCurrentDeck);

    const tabs: DeckData[] = [
        currentDeck.character,
        currentDeck.scenario,
        ...currentDeck.supports,
    ];

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const imgURL = (index: number) => {
        if (index === 0) {
            return "characters/avatars";
        } else if (index === 1) {
            return "scenarios";
        } else {
            return "supports/icons";
        }
    };

    const getItem = (index: number, id: number) => {
        if (index === 0) {
            return characters.find((char) => char.id === id);
        } else if (index === 1) {
            return scenarios.find((s) => s.id === id);
        } else {
            return supports.find((supp) => supp.id === id);
        }
    };

    const itemName = (index: number, id: number | null) => {
        let item = getItem(index, id || 0);
        if (index === 0) {
            if (item && "skills" in item) {
                return `${item.name} (${item.outfit || "Original"})`;
            } else {
                return "";
            }
        } else if (index === 1) {
            if (item) {
                return item.name;
            } else {
                return "";
            }
        } else {
            const ranks = ["R", "SR", "SSR"];
            if (item && "specialty" in item) {
                return `${item.name} (${ranks[item.rarity - 3]} ${
                    item.specialty
                })`;
            } else {
                return "";
            }
        }
    };

    const imgStyles = (index: number) => ({
        width: matches_md_up ? "64px" : "48px",
        height: matches_md_up ? "64px" : "48px",
        opacity: index === tabValue ? 1 : 0.5,
    });

    const renderTabPanel = (index: number, id: number | null) => {
        const item = getItem(index, id || 0);
        return (
            <>
                <FlexBox
                    sx={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        mb: "16px",
                        gap: "16px",
                    }}
                >
                    {index < 8 ? (
                        <>
                            <Image
                                src={`${imgURL(index)}/${id}`}
                                alt={`${id}`}
                                style={{ width: "40px", height: "100%" }}
                            />
                            <TextStyled variant="h6-styled">
                                {itemName(index, id)}
                            </TextStyled>
                        </>
                    ) : (
                        <>
                            {id !== -1 && (
                                <Image
                                    src={`supports/icons/${id}`}
                                    alt={`${id}`}
                                    style={{ width: "40px", height: "100%" }}
                                />
                            )}
                            <TextStyled variant="h6-styled">
                                {id !== -1
                                    ? itemName(index, id)
                                    : `Events with other characters`}
                            </TextStyled>
                            <IconButton
                                disableRipple
                                sx={{
                                    backgroundColor: theme.background(2),
                                    borderRadius: "8px",
                                    p: "4px 16px",
                                    gap: "8px",
                                }}
                                onClick={handleClickOpen}
                            >
                                <SearchIcon
                                    sx={{
                                        color: theme.text.primary,
                                        width: "24px",
                                        height: "24px",
                                    }}
                                />
                                <TextStyled variant="body2-styled">
                                    Search
                                </TextStyled>
                            </IconButton>
                        </>
                    )}
                </FlexBox>
                {index === 0 && (
                    <EventCharacter character={item as Character} />
                )}
                {index === 1 && <EventScenario scenario={item as Scenario} />}
                {index > 1 && index < 8 && (
                    <EventSupport support={item as Support} />
                )}
                {index === 8 && id !== -1 && (
                    <EventSupport support={item as Support} />
                )}
            </>
        );
    };

    useEffect(() => {
        dispatch(addSupport({ index: 6, id: -1 }));
    }, []);

    return (
        <>
            <MainContentBox
                title="Training Event Viewer"
                actions={<EventSettings />}
                contentProps={{ padding: settings.showAll ? 2 : 0 }}
            >
                {!tabs.includes(null) ? (
                    <Grid container alignItems="flex-start">
                        {!settings.showAll && (
                            <Grid size={{ xs: 12, md: "auto" }}>
                                <StyledTabs
                                    variant="scrollable"
                                    orientation={
                                        matches_md_up
                                            ? "vertical"
                                            : "horizontal"
                                    }
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    scrollButtons="auto"
                                    allowScrollButtonsMobile={!matches_md_up}
                                    sx={{
                                        height: "100%",
                                        "& .MuiTabScrollButton-root": {
                                            color: theme.text.primary,
                                            backgroundColor:
                                                theme.background(2),
                                        },
                                        ".MuiTabs-scrollButtons.Mui-disabled": {
                                            opacity: 0.3,
                                        },
                                        "& .MuiTabs-indicatorSpan": {
                                            width: "100%",
                                            backgroundColor:
                                                theme.border.color.primary,
                                        },
                                    }}
                                >
                                    {tabs.map((id, index) => (
                                        <StyledTab
                                            key={index}
                                            icon={
                                                index < 8 ? (
                                                    <Image
                                                        src={`${imgURL(
                                                            index
                                                        )}/${id}`}
                                                        alt={`${id}`}
                                                        style={imgStyles(index)}
                                                        // tooltip={itemName(index, id)}
                                                        // tooltipArrow={
                                                        //     matches_md_up ? "top" : "bottom"
                                                        // }
                                                    />
                                                ) : (
                                                    <ZoomInIcon
                                                        sx={{
                                                            ...imgStyles(index),
                                                            color: theme.text
                                                                .primary,
                                                        }}
                                                    />
                                                )
                                            }
                                            sx={{ px: 0, py: 0.5 }}
                                        />
                                    ))}
                                </StyledTabs>
                            </Grid>
                        )}
                        <Grid size={{ xs: 12, md: "grow" }}>
                            <Stack
                                spacing={settings.showAll ? 2 : 0}
                                divider={settings.showAll && <Divider />}
                            >
                                {tabs.map((id, index) =>
                                    !settings.showAll ? (
                                        <TabPanel
                                            key={index}
                                            index={index}
                                            value={tabValue}
                                        >
                                            {renderTabPanel(index, id)}
                                        </TabPanel>
                                    ) : (
                                        <Box key={index}>
                                            {renderTabPanel(index, id)}
                                        </Box>
                                    )
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                ) : (
                    <Box sx={{ p: 2 }}>
                        <TextStyled>
                            Select a trainee and complete your Support Card deck
                            to begin
                        </TextStyled>
                    </Box>
                )}
            </MainContentBox>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                disableScrollLock
            >
                <EventSearch deck={currentDeck} handleClose={handleClose} />
            </Dialog>
        </>
    );
}

export default EventViewer;
