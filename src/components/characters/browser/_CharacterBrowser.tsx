import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";

// Component imports
// import CharacterFilters from "./CharacterFilters";
// import CharacterTable from "./CharacterTable";
import InfoCard from "custom/InfoCard";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Button, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { filterCharacters } from "helpers/filterCharacters";
import { selectCharacters } from "reducers/character";
import {
    clearFilters,
    selectCharacterFilters,
} from "reducers/characterFilters";
import { selectBrowserSettings, setBrowserView, View } from "reducers/browser";

function CharacterBrowser() {
    const documentTitle = `Characters ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Umamusume: Pretty Derby Characters`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)];
    const filters = useAppSelector(selectCharacterFilters);
    const browserSettings = useAppSelector(selectBrowserSettings).characters;

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentCharacters = useMemo(
        () =>
            filterCharacters(characters, filters, searchValue, browserSettings),
        [characters, filters, searchValue, browserSettings]
    );

    const currentView = browserSettings.view;
    const [view, setView] = useState<View>(currentView);
    const handleView = (_: BaseSyntheticEvent, view: View) => {
        if (view !== null) {
            setView(view);
            dispatch(setBrowserView({ type: "characters", view }));
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "icon",
            icon: <ViewCompactIcon />,
        },
        {
            value: "card",
            icon: <ViewModuleIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        Characters
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 6, sm: "auto" }}>
                    {/* <ToggleButtons
                        color="primary"
                        buttons={buttons}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    /> */}
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    {/* <Button
                        onClick={
                            matches_md_up
                                ? toggleDrawerState
                                : handleMobileDrawerOpen
                        }
                        variant="contained"
                        color="primary"
                        disableElevation
                        disableRipple
                        startIcon={
                            matches_md_up && drawerOpen ? (
                                <KeyboardArrowRightIcon />
                            ) : (
                                <TuneIcon />
                            )
                        }
                        sx={{ height: "36px" }}
                    >
                        Filters
                    </Button> */}
                </Grid>
            </Grid>
            {view === "icon" && (
                <Grid container spacing={3}>
                    {currentCharacters.map((char) => (
                        <InfoCard
                            key={char.id}
                            id={char.id}
                            cardID={`${char.name}-characterBrowser`}
                            name={char.name}
                            title={char.title}
                            type="character"
                            rarity={char.rarity}
                            materials={char.materials}
                            backgroundColor={theme.background(1)}
                            size="144px"
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}

export default CharacterBrowser;
