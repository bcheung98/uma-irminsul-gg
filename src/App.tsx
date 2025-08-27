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
        // TODO: REMOVE PORT PARAM
        dispatch(fetchEvents({ type: "support-common", port: 3000 }));
        dispatch(fetchEvents({ type: "support-ssr", port: 3001 }));
        dispatch(fetchEvents({ type: "support-sr", port: 3002 }));
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
