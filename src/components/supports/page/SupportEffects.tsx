// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Stack } from "@mui/material";

// Type imports
import { SupportProps } from "types/support";

function SupportEffects({ support }: SupportProps) {
    const { perks, supportEffects } = support;

    const levels = ["30", "35", "40", "45", "50"];

    const uniqueEffects = perks.effects.map((effect) => [
        effect.effect,
        ...effect.values,
    ]);

    const data: (string | number)[][] = [["Level", ...levels]];
    supportEffects.map((effect) =>
        data.push([effect.effect, ...effect.values])
    );

    return (
        <MainContentBox title="Support Effects">
            <Stack spacing={2}>
                <Box>
                    <TextStyled sx={{ mb: "8px" }}>
                        {`Unique Effect (Lv ${perks.unlock}+)`}
                    </TextStyled>
                    <StatsTable
                        levels={[""]}
                        data={uniqueEffects}
                        orientation="column"
                        tableProps={{
                            sx: {
                                width: { xs: "100%", lg: "50%" },
                            },
                        }}
                    />
                </Box>
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
                    tableProps={{
                        sx: {
                            width: { xs: "100%", lg: "50%" },
                        },
                    }}
                />
            </Stack>
        </MainContentBox>
    );
}

export default SupportEffects;
