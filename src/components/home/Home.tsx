// Component imports
import CurrentBanners from "components/banners/CurrentBanners";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Stack } from "@mui/material";

function Home() {
    document.title = `Umamusume: Pretty Derby - Irminsul.GG`;

    const theme = useTheme();

    return (
        <Stack spacing={3}>
            <Card sx={{ p: 2, backgroundColor: theme.background(1) }}>
                <TextStyled>
                    Welcome to the Umamusume: Pretty Derby branch of
                    IRMINSUL.GG!
                </TextStyled>
                <TextStyled>
                    Note that this site will be a WIP for a while.
                </TextStyled>
            </Card>
            <CurrentBanners />
        </Stack>
    );
}

export default Home;
