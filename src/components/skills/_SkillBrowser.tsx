import { BaseSyntheticEvent, useState, useMemo, useEffect } from "react";

// Component imports
import SkillListRow from "./SkillListRow";
import SkillFilters from "./SkillFilters";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { TextStyled } from "styled/StyledTypography";
// import { Virtuoso } from "react-virtuoso";

// MUI imports
import { useTheme, useMediaQuery, Card, Button, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppDispatch, useAppSelector, selectAppSkills } from "helpers/hooks";
import { filterSkills } from "helpers/filterSkills";
import { clearFilters, selectSkillFilters } from "reducers/skillFilters";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";
import { selectBrowserSettings } from "reducers/browser";

function SkillBrowser() {
    const documentTitle = `Skills ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Umamusume: Pretty Derby Skills`;
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

    const skills = useAppSelector(selectAppSkills);
    const filters = useAppSelector(selectSkillFilters);
    const browserSettings = useAppSelector(selectBrowserSettings).skills;

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentSkills = useMemo(
        () => filterSkills(skills, filters, searchValue, browserSettings),
        [skills, filters, searchValue, browserSettings]
    );

    const drawerOpen = useAppSelector(isRightDrawerOpen);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleDrawerState = () => {
        dispatch(toggleRightDrawer());
    };
    const handleMobileDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };
    const handleMobileDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

    useEffect(() => {
        dispatch(toggleRightDrawer(matches_md_up));
    }, [matches_md_up]);

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
                        Skills
                    </TextStyled>
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
                    <Button
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
                    </Button>
                </Grid>
            </Grid>
            {/* <Virtuoso
                style={{ height: "80vh" }}
                data={currentSkills}
                itemContent={(index, skill) => (
                    <SkillListRow skill={skill} index={index} />
                )}
            /> */}
            <Card>
                {currentSkills.map((skill, index) => (
                    <SkillListRow key={skill.id} skill={skill} index={index} />
                ))}
            </Card>
            <ActionFab
                action={
                    matches_md_up ? toggleDrawerState : handleMobileDrawerOpen
                }
                icon={<TuneIcon />}
                tooltip="Open filters"
                tooltipArrow="left"
            />
            {!matches_md_up && (
                <Drawer
                    sx={theme.styles.drawer(matches_sm_up)}
                    variant="temporary"
                    anchor={matches_sm_up ? "right" : "bottom"}
                    open={mobileDrawerOpen}
                    onClose={handleMobileDrawerClose}
                >
                    <SkillFilters handleClose={handleMobileDrawerClose} />
                </Drawer>
            )}
        </>
    );
}

export default SkillBrowser;
