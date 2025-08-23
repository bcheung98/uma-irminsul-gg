// Component imports
import CurrentBanners from "components/banners/CurrentBanners";

// MUI imports
import { Stack } from "@mui/material";

function Home() {
    document.title = `Umamusume: Pretty Derby - Irminsul.GG`;

    return (
        <Stack spacing={3}>
            <CurrentBanners />
        </Stack>
    );
}

export default Home;
