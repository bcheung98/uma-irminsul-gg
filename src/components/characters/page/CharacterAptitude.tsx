// Component imports
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Card, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterAptitude({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { aptitude } = character;

    return (
        <Stack spacing={1} sx={{ px: { xs: "16px", md: "8px" } }}>
            {Object.entries(aptitude).map(([category, values]) => (
                <Grid key={category} container spacing={1}>
                    <Grid size={{ xs: 12, md: "grow" }}>
                        <TextStyled
                            sx={{
                                textAlign: {
                                    xs: "left",
                                    md: "center",
                                },
                            }}
                        >
                            {getAptitudeName(category)}
                        </TextStyled>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10, xl: 10.5 }}>
                        <FlexBox flexWrap="wrap" gap="8px">
                            {Object.entries(values).map(([apt, rank]) => (
                                <Card
                                    key={apt}
                                    sx={{
                                        p: "2px 8px",
                                        backgroundColor: theme.background(0),
                                        width: "96px",
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-around"
                                    >
                                        <TextStyled variant="body2-styled">
                                            {getAptitudeName(apt)}
                                        </TextStyled>
                                        <Image
                                            src={`ranks/${rank}`}
                                            alt={`${rank}`}
                                            style={{
                                                marginTop: "2px",
                                                height: matches_sm_up
                                                    ? "20px"
                                                    : "16px",
                                            }}
                                        />
                                    </Stack>
                                </Card>
                            ))}
                        </FlexBox>
                    </Grid>
                </Grid>
            ))}
        </Stack>
    );
}

export default CharacterAptitude;

function getAptitudeName(apt: string) {
    switch (apt) {
        case "short":
            return "Sprint";
        case "surface":
            return "Track";
        case "distance":
            return "Distance";
        case "strategy":
            return "Style";
        default:
            return toTitleCase(apt);
    }
}
