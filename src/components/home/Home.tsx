// Component imports
import CurrentBanners from "components/banners/CurrentBanners";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Stack } from "@mui/material";

function Home() {
    document.title = `Umamusume - Irminsul.GG`;

    const theme = useTheme();

    return (
        <Stack spacing={3}>
            <Card sx={{ p: 2, backgroundColor: theme.background(1) }}>
                <TextStyled variant="h6-styled">
                    Welcome to the Umamusume: Pretty Derby branch of
                    IRMINSUL.GG!
                </TextStyled>
                <br />
                <TextStyled>
                    NEW: JP server data has been added! You can switch between
                    the Global and JP server in the settings.
                </TextStyled>
            </Card>
            <CurrentBanners />
        </Stack>
    );
}

export default Home;
