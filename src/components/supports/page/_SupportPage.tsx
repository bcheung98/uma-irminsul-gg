import { useParams } from "react-router";

// Component imports
import SupportImage from "./SupportImage";
import SupportInfo from "./SupportInfo";
import SupportEffects from "./SupportEffects";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSupports } from "reducers/support";

function SupportPage() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const params = useParams<{ id: string }>();
    const support = useAppSelector(selectSupports).find(
        (char) =>
            `${char.name.split(" ").join("-").toLowerCase()}-${char.id}` ===
            params.id
    );

    if (support !== undefined) {
        const name = `${support.name} (${support.title})`;

        const documentTitle = `${name} ${import.meta.env.VITE_DOCUMENT_TITLE}`;
        const documentDesc = `${name} - ${support.rarity}★`;
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

        const betaTag = <BetaTag version={support.release} />;

        const supportImage = <SupportImage support={support} />;
        const supportInfo = <SupportInfo support={support} />;
        const supportEffects = <SupportEffects support={support} />;

        return (
            <Stack spacing={2}>
                <>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: "auto" }}>
                            {supportImage}
                        </Grid>
                        <Grid size={{ xs: 12, sm: "grow" }}>
                            <Stack spacing={2}>
                                {betaTag}
                                {supportInfo}
                                {matches_md_up && supportEffects}
                            </Stack>
                        </Grid>
                    </Grid>
                    {!matches_md_up && supportEffects}
                </>
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default SupportPage;
