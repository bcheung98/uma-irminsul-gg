// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Card, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Helper imports
import { scenarios } from "data/scenarios";
import { useAppSelector } from "helpers/hooks";
import { selectUnreleasedContent } from "reducers/settings";

// Type imports
import { DeckData } from "types/planner";

function DeckScenarioCard({ data }: { data: DeckData }) {
    const theme = useTheme();

    const showUnreleased = useAppSelector(selectUnreleasedContent);

    const scenario = scenarios.find((s) => s.id === data);

    let scenarioName = "Scenario";
    if (scenario) {
        scenarioName = showUnreleased ? scenario.nameJP : scenario.name;
    }

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
            backgroundColor: scenario
                ? theme.background(0, "dark")
                : theme.background(0, "light"),
        },
    };

    return (
        <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "96px" }}
        >
            {scenario ? (
                <Card sx={cardStyles}>
                    <Image
                        src={`scenarios/${scenario.id}`}
                        alt={scenario.name}
                        style={{ width: "85%", height: "85%" }}
                    />
                </Card>
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
                {scenarioName}
            </TextStyled>
        </Stack>
    );
}

export default DeckScenarioCard;
