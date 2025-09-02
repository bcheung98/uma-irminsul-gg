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

function DeckSupportCard({ data, mini }: { data: DeckData; mini?: boolean }) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const support = useAppSelector(selectSupports).find(
        (supp) => supp.id === data
    );

    const cardStyles: SxProps = {
        width: { xs: "64px", sm: mini ? "64px" : "96px" },
        height: { xs: "64px", sm: mini ? "64px" : "136px" },
        borderRadius: "16px",
        backgroundColor: theme.background(0, "dark"),
        cursor: mini ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: mini
                ? theme.background(0, "dark")
                : theme.background(0, "light"),
        },
    };

    return (
        <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ width: { xs: "64px", sm: mini ? "64px" : "96px" } }}
        >
            {support ? (
                <Box sx={{ cursor: mini ? "default" : "pointer" }}>
                    <InfoCard
                        key={support.id}
                        id={support.id}
                        cardID={`${support.id}-planner`}
                        name={support.name}
                        title={support.title}
                        type="support"
                        rarity={support.rarity}
                        backgroundColor={theme.background(0, "dark")}
                        size={matches_sm_up ? (mini ? "64px" : "96px") : "64px"}
                        variant={
                            matches_sm_up ? (mini ? "icon" : "avatar") : "icon"
                        }
                        showName={false}
                        disableTooltip
                        disableLink
                        disableZoomOnHover
                    />
                </Box>
            ) : (
                <Card sx={cardStyles}>
                    {!mini && (
                        <AddCircleOutlineIcon
                            fontSize="large"
                            sx={{ color: theme.text.primary }}
                        />
                    )}
                </Card>
            )}
            {!mini && (
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
            )}
        </Stack>
    );
}

export default DeckSupportCard;
