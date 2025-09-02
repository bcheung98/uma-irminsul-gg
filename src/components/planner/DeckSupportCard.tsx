// Component imports
import InfoCard from "custom/InfoCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Card,
    Box,
    Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectSupports } from "reducers/support";

// Type imports
import { DeckData } from "types/planner";

function DeckSupportCard({ data }: { data: DeckData }) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const support = useAppSelector(selectSupports).find(
        (supp) => supp.id === data
    );

    const cardStyles: SxProps = {
        width: { xs: "64px", sm: "96px" },
        height: { xs: "64px", sm: "136px" },
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
            sx={{ width: { xs: "64px", sm: "96px" } }}
        >
            {support ? (
                <Box sx={{ cursor: "pointer" }}>
                    <InfoCard
                        key={support.id}
                        id={support.id}
                        cardID={`${support.id}-planner`}
                        name={support.name}
                        title={support.title}
                        type="support"
                        rarity={support.rarity}
                        info={{
                            rank: support.rarity,
                        }}
                        backgroundColor={theme.background(0, "dark")}
                        size={matches_sm_up ? "96px" : "64px"}
                        variant={matches_sm_up ? "avatar" : "icon"}
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
                {support ? support.name : "Support"}
            </TextStyled>
        </Stack>
    );
}

export default DeckSupportCard;
