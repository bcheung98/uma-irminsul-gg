import { useState } from "react";

// Component imports
import Image from "custom/Image";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Stack, Box, Divider } from "@mui/material";
import { TextStyled } from "styled/StyledTypography";

// Helper imports
import { objectKeys, range, toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterStats({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));
    const matches_xl_up = useMediaQuery(theme.breakpoints.up("xl"));

    const { rarity, stats } = character;

    const levels = range(rarity, 5).map((i) => i);

    const [sliderValue, setSliderValue] = useState(1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = levels.map((rarity, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={
                    sliderValue === index + 1 ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === index + 1 ? 1 : 0.25,
                }}
            >
                {rarity}★
            </TextStyled>
        ),
    }));

    return (
        <Box sx={{ px: "16px" }}>
            <TextStyled>Stats</TextStyled>
            <Stack
                direction={{ xs: "column", md: "row" }}
                divider={
                    <Divider
                        orientation={matches_md_up ? "vertical" : "horizontal"}
                        flexItem
                    />
                }
                sx={{ my: "8px" }}
            >
                {objectKeys(stats).map((stat) => (
                    <Stack
                        key={stat}
                        direction={{ xs: "row", md: "column" }}
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            p: "8px 16px",
                            backgroundColor: theme.background(0),
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <Stack
                            direction={
                                !matches_md_up || matches_xl_up
                                    ? "row"
                                    : "column"
                            }
                            spacing={1}
                            alignItems="center"
                        >
                            <Image
                                src={`stat_icons/${toTitleCase(stat)}`}
                                alt={stat}
                                style={{
                                    width: matches_md_up ? "24px" : "20px",
                                }}
                            />
                            <TextStyled variant="body2-styled">
                                {toTitleCase(stat)}
                            </TextStyled>
                        </Stack>
                        <Stack
                            direction={matches_md_up ? "column" : "row"}
                            sx={{
                                width: { xs: "30%", md: "50%" },
                                rowGap: "4px",
                                columnGap: "16px",
                            }}
                            alignItems="center"
                            justifyContent={{
                                xs: "space-between",
                                md: "center",
                            }}
                        >
                            <TextStyled
                                variant={
                                    matches_md_up ? "h6-styled" : "body2-styled"
                                }
                            >
                                {
                                    stats[stat as keyof typeof stats][
                                        sliderValue - 1
                                    ]
                                }
                            </TextStyled>
                            <TextStyled variant="body2-styled">
                                {`+${
                                    stats[stat as keyof typeof stats].slice(
                                        -1
                                    )[0]
                                }%`}
                            </TextStyled>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Box sx={{ width: { xs: "75%", md: "25vw" } }}>
                <StyledSlider
                    value={sliderValue}
                    marks={marks}
                    step={1}
                    min={1}
                    max={levels.length}
                    onChange={handleSliderChange}
                    size={matches_md_up ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "200px",
                        ml: 2,
                    }}
                />
            </Box>
        </Box>
    );
}

export default CharacterStats;
