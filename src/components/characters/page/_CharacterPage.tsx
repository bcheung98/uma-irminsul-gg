import { useParams } from "react-router";

// Component imports
import CharacterImage from "./CharacterImage";
import CharacterInfoMain from "./CharacterInfoMain";
import CharacterSkills from "./CharacterSkills";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI imports
import { useTheme, useMediaQuery, Stack, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

function CharacterPage() {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const params = useParams<{ id: string }>();
    const character = useAppSelector(selectCharacters).find(
        (char) =>
            `${char.name.split(" ").join("-").toLowerCase()}-${char.id}` ===
            params.id
    );

    if (character !== undefined) {
        const name = `${character.name} (${character.title})`;

        const documentTitle = `${name} ${import.meta.env.VITE_DOCUMENT_TITLE}`;
        const documentDesc = `${name} - ${character.rarity}★`;
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

        const betaTag = <BetaTag version={character.release} />;

        const charSplash = <CharacterImage character={character} />;
        const infoMain = <CharacterInfoMain character={character} />;

        return (
            <Stack spacing={2}>
                <Grid container spacing={3}>
                    {matches_sm_up && (
                        <Grid size={4}>
                            <Box>{charSplash}</Box>
                        </Grid>
                    )}
                    <Grid size="grow">
                        <Stack spacing={2}>
                            {betaTag}
                            {infoMain}
                        </Stack>
                    </Grid>
                </Grid>
                <CharacterSkills character={character} />
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default CharacterPage;
