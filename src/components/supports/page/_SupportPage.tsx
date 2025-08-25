import { useParams } from "react-router";

// Component imports
import SupportImage from "./SupportImage";
import SupportInfo from "./SupportInfo";
import SupportEffects from "./SupportEffects";
import SupportSkills from "./SupportSkills";
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
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const params = useParams<{ id: string }>();
    const support = useAppSelector(selectSupports).find(
        (char) =>
            `${char.name.split(" ").join("-").toLowerCase()}-${char.id}` ===
            params.id
    );

    const ranks = ["R", "SR", "SSR"];

    if (support !== undefined) {
        const name = `${support.name} (${ranks[support.rarity - 3]} ${
            support.specialty
        })`;

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
        const supportSkills = <SupportSkills support={support} />;

        const supportDetails = (
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, lg: "grow" }}>{supportEffects}</Grid>
                <Grid size={{ xs: 12, lg: 6 }}>{supportSkills}</Grid>
            </Grid>
        );

        return (
            <Stack spacing={2}>
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                    <Grid size={{ xs: 5, sm: "auto" }}>{supportImage}</Grid>
                    <Grid size={{ xs: "grow", sm: "grow" }}>
                        <Stack spacing={2}>
                            {betaTag}
                            {supportInfo}
                            {matches_sm_up && supportDetails}
                        </Stack>
                    </Grid>
                </Grid>
                {!matches_sm_up && supportDetails}
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default SupportPage;
