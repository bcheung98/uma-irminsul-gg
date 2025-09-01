// Component imports
import InfoCard from "custom/InfoCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Card, Box, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

// Type imports
import { DeckData } from "types/planner";

function DeckCharacterCard({ data }: { data: DeckData }) {
    const theme = useTheme();

    const character = useAppSelector(selectCharacters).find(
        (char) => char.id === data
    );

    const cardStyles: SxProps = {
        width: "96px",
        height: "96px",
        borderRadius: "16px",
        backgroundColor: theme.background(0, "dark"),
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: theme.background(0, "light"),
        },
    };

    return (
        <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "96px" }}
        >
            {character ? (
                <Box sx={{ cursor: "pointer" }}>
                    <InfoCard
                        key={character.id}
                        id={character.id}
                        cardID={`${character.id}-planner`}
                        name={character.name}
                        title={character.title}
                        type="character"
                        rarity={character.rarity}
                        info={{
                            rank: character.rarity,
                        }}
                        backgroundColor={theme.background(0, "dark")}
                        size="96px"
                        showName={false}
                        disableTooltip
                        disableLink
                        disableZoomOnHover
                    />
                </Box>
            ) : (
                <Card sx={cardStyles}>
                    <AddCircleOutlineIcon
                        fontSize="large"
                        sx={{ color: theme.text.primary }}
                    />
                </Card>
            )}
            <TextStyled
                variant="body2-styled"
                sx={{
                    textAlign: "center",
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            >
                {character ? character.name : "Trainee"}
            </TextStyled>
        </Stack>
    );
}

export default DeckCharacterCard;
