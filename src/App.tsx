import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import "App.css";

// Component imports
import RouteConfig from "components/nav/RouteConfig";

// MUI imports
import { CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import {
    fetchCharacters,
    fetchSupports,
    fetchSkills,
    fetchCharacterBanners,
    fetchSupportBanners,
    fetchEvents,
    fetchCharacterProfiles,
} from "rtk/fetchData";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectTheme, setTheme } from "reducers/settings";
import { getTheme } from "themes/theme";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCharacterProfiles());
        dispatch(fetchCharacters());
        dispatch(fetchSupports());
        dispatch(fetchSkills());
        dispatch(fetchCharacterBanners());
        dispatch(fetchSupportBanners());
        dispatch(fetchEvents({ type: "support-common" }));
        dispatch(fetchEvents({ type: "support-ssr" }));
        dispatch(fetchEvents({ type: "support-sr" }));
        dispatch(fetchEvents({ type: "support-pal" }));
        dispatch(fetchEvents({ type: "character" }));
        dispatch(fetchEvents({ type: "character-outfit" }));
    }, []);

    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        dispatch(setTheme(theme));
    }, [theme]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline />
                <RouteConfig />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
