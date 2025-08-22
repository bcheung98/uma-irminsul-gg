// Component imports
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack, Card } from "@mui/material";

// Type imports
import { SupportProps } from "types/support";

function SupportInfo({ support }: SupportProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { name, title, perks } = support;

    const uniqueEffects = perks.effects
        .map((effect) => effect.effect)
        .join(" and ");

    return (
        <MainContentBox
            title={
                <Box
                    sx={{
                        p: { xs: "8px", sm: "16px" },
                        width: "100%",
                    }}
                >
                    <TextStyled
                        variant={matches_sm_up ? "h6-styled" : "body1-styled"}
                    >
                        {`[${title}]`}
                    </TextStyled>
                    <TextStyled
                        variant={matches_sm_up ? "h4-styled" : "h6-styled"}
                    >
                        {name}
                    </TextStyled>
                </Box>
            }
            headerProps={{ padding: "0px" }}
            contentProps={{
                padding:
                    uniqueEffects.length > 0
                        ? matches_sm_up
                            ? "16px"
                            : "12px"
                        : "0px",
            }}
        >
            {uniqueEffects.length > 0 && (
                <Stack spacing={1} sx={{ width: "100%", maxWidth: "300px" }}>
                    <FlexBox
                        columnGap="8px"
                        flexWrap="wrap"
                        justifyContent="space-between"
                    >
                        <TextStyled>{`Unique Perk`}</TextStyled>
                        <TextStyled>{`(Lv ${perks.unlock})`}</TextStyled>
                    </FlexBox>
                    <Card
                        elevation={0}
                        sx={{
                            p: { xs: 0, sm: 1 },
                            backgroundColor: {
                                xs: "transparent",
                                sm: theme.background(0, "main"),
                            },
                        }}
                    >
                        <TextStyled variant="body2-styled">
                            {uniqueEffects}
                        </TextStyled>
                    </Card>
                </Stack>
            )}
        </MainContentBox>
    );
}

export default SupportInfo;
