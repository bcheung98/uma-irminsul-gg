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
                <TextStyled variant="h6-styled">
                    Welcome to the Umamusume: Pretty Derby branch of
                    IRMINSUL.GG!
                </TextStyled>
                <br />
                <TextStyled>
                    Note that this site will be a WIP for a while, and things
                    might be broken.
                </TextStyled>
                <TextStyled>
                    If you find a bug or have any feedback, join the Discord to
                    let me know about it!
                </TextStyled>
            </Card>
            <CurrentBanners />
        </Stack>
    );
}

export default Home;
