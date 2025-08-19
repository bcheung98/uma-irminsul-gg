// Component imports
// import StatsTable from "custom/StatsTable";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Stack } from "@mui/material";

// Type imports
import { SupportProps } from "types/support";

function SupportPerks({ support }: SupportProps) {
    const theme = useTheme();

    const { perks } = support;

    // const uniqueEffects = perks.effects.map((effect) => [
    //     effect.effect,
    //     ...effect.values,
    // ]);

    const uniqueEffects = perks.effects
        .map((effect) => effect.effect)
        .join(" and ");

    return (
        <>
            {uniqueEffects.length > 0 && (
                <Stack spacing={1} sx={{ width: "100%", maxWidth: "300px" }}>
                    <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="space-between"
                    >
                        <TextStyled sx={{ mb: "8px" }}>
                            {`Unique Effect`}
                        </TextStyled>
                        <TextStyled sx={{ mb: "8px" }}>
                            {`(Lv ${perks.unlock})`}
                        </TextStyled>
                    </Stack>
                    <Card
                        sx={{
                            px: 2,
                            py: 1,
                            backgroundColor: theme.background(0, "main"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <TextStyled variant="body2-styled">
                            {uniqueEffects}
                        </TextStyled>
                        {/* <StatsTable
                            levels={[""]}
                            data={uniqueEffects}
                            orientation="column"
                            tableProps={{
                                sx: { width: "100%", maxWidth: "300px" },
                            }}
                        /> */}
                    </Card>
                </Stack>
            )}
        </>
    );
}

export default SupportPerks;
