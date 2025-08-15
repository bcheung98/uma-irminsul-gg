// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Stack } from "@mui/material";

// Helper imports
import { sortBy } from "helpers/utils";

// Type imports
import { SupportProps } from "types/support";

function SupportEffects({ support }: SupportProps) {
    const { rarity, perks, supportEffects } = support;

    let levels = [20, 25, 30, 35, 40];
    if (rarity === 4) {
        levels = levels.map((i) => i + 5);
    }
    if (rarity === 5) {
        levels = levels.map((i) => i + 10);
    }

    const data: (string | number)[][] = [["Level", ...levels]];
    const effects = [...supportEffects].sort(
        (a, b) =>
            sortBy(b.unlock || 1, a.unlock || 1) ||
            a.effect.localeCompare(b.effect)
    );
    effects.map((effect) =>
        data.push([
            `${effect.effect}`,
            ...effect.values.map((value) =>
                value === "-" ? `[Unlocks at Lv ${effect.unlock}]` : value
            ),
        ])
    );

    const uniqueEffects = perks.effects.map((effect) => [
        effect.effect,
        ...effect.values,
    ]);

    return (
        <MainContentBox title="Support Effects">
            <Stack spacing={2}>
                <StatsTable
                    levels={levels}
                    data={data}
                    orientation="column"
                    sliderProps={{
                        initialValue: 1,
                        sx: {
                            minWidth: "100px",
                            maxWidth: "50%",
                            ml: "8px",
                        },
                    }}
                    tableProps={{ sx: { width: "100%" } }}
                />
                {uniqueEffects.length > 0 && (
                    <Box>
                        <TextStyled sx={{ mb: "8px" }}>
                            {`Unique Effect [Lv ${perks.unlock}+]`}
                        </TextStyled>
                        <StatsTable
                            levels={[""]}
                            data={uniqueEffects}
                            orientation="column"
                            tableProps={{ sx: { width: "100%" } }}
                        />
                    </Box>
                )}
            </Stack>
        </MainContentBox>
    );
}

export default SupportEffects;
