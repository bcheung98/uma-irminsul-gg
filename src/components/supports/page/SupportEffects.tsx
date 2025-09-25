import { useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack, Icon } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LockIcon from "@mui/icons-material/Lock";

// Helper imports
import { sortBy } from "helpers/utils";
import { supportEffects as effectList } from "data/supportEffects";

// Type imports
import { SupportEffect, SupportProps } from "types/support";

function SupportEffects({ support }: SupportProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { rarity, supportEffects } = support;

    let levels = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    const [sliderValue, setSliderValue] = useState(rarity + 1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const effects = [...supportEffects].sort((a, b) =>
        sortBy(b.unlock, a.unlock)
    );

    const getEffect = (tag: string | number) => {
        return effectList.find(
            (effect) => effect.id === tag || effect.name === tag
        );
    };

    const marks = levels.map((level, index) => ({
        value: index,
        label: (
            <TextStyled
                variant={
                    sliderValue === index ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === index ? 1 : 0.25,
                }}
            >
                {level}
            </TextStyled>
        ),
    }));
    const iconStyles = {
        width: { xs: "20px", sm: "24px" },
        height: { xs: "20px", sm: "24px" },
        lineHeight: { xs: "20px", sm: "24px" },
    };

    const cardStyles = (effect: SupportEffect) => {
        return {
            p: 1,
            backgroundColor:
                levels[sliderValue] < effect.unlock
                    ? theme.background(1, "light")
                    : theme.background(0, "main"),
            border: theme.mainContentBox.border,
            borderRadius: theme.mainContentBox.borderRadius,
        };
    };

    const getEffectValue = (effect: SupportEffect) => {
        const value = effect.values[sliderValue];
        let valueText = value.toString();
        if (
            [
                "Friendship Bonus",
                "Mood Effect",
                "Training Effectiveness",
                "Race Bonus",
                "Fan Bonus",
                "Hint Frequency",
                "Event Recovery",
                "Event Effectiveness",
                "Failure Protection",
                "Energy Cost Reduction",
                "All Stats Bonus",
            ].includes(effect.effect)
        ) {
            valueText += "%";
        }
        if (effect.effect === "Hint Levels") {
            valueText = `Lvl ${value}`;
        }
        return value === -1 ? (
            <Stack spacing={1} direction="row" alignItems="center">
                <Icon
                    sx={{
                        ...iconStyles,
                        color: theme.text.primary,
                    }}
                >
                    <LockIcon fontSize={matches_sm_up ? "medium" : "small"} />
                </Icon>
                <TextStyled variant="body2-styled">{`Lvl ${effect.unlock}`}</TextStyled>
            </Stack>
        ) : (
            <TextStyled variant="body2-styled">{valueText}</TextStyled>
        );
    };

    return (
        <MainContentBox
            title="Support Effects"
            contentProps={{ padding: "16px" }}
        >
            <Box
                sx={{
                    width: { xs: "75%", md: "30vw" },
                    mb: { xs: "0px", sm: "8px" },
                }}
            >
                <StyledSlider
                    value={sliderValue}
                    marks={marks}
                    step={1}
                    min={0}
                    max={rarity + 5}
                    onChange={handleSliderChange}
                    size={matches_md_up ? "medium" : "small"}
                    sx={{
                        minWidth: "200px",
                        maxWidth: "400px",
                        ml: 2,
                    }}
                />
            </Box>
            <Stack spacing={1}>
                {effects.map((e) => {
                    let effect = getEffect(e.effect);
                    if (effect) {
                        return (
                            <Stack
                                key={effect.id}
                                spacing={0.5}
                                sx={cardStyles(e)}
                            >
                                <FlexBox
                                    sx={{
                                        flexWrap: "wrap",
                                        gap: "8px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Icon
                                            sx={{
                                                ...iconStyles,
                                                color: theme.text.star,
                                            }}
                                        >
                                            <AutoAwesomeIcon
                                                fontSize={
                                                    matches_sm_up
                                                        ? "medium"
                                                        : "small"
                                                }
                                            />
                                        </Icon>
                                        <StyledTooltip
                                            title={effect.description}
                                            arrow
                                            placement="top"
                                        >
                                            <Box>
                                                <TextStyled
                                                    variant="body2-styled"
                                                    sx={{
                                                        cursor: "default",
                                                        textDecoration:
                                                            "underline dotted",
                                                    }}
                                                >
                                                    {effect.displayName}
                                                </TextStyled>
                                            </Box>
                                        </StyledTooltip>
                                    </Stack>
                                    {getEffectValue(e)}
                                </FlexBox>
                                {/* <TextStyled variant="body2-styled">
                                    {effect.description}
                                </TextStyled> */}
                            </Stack>
                        );
                    } else {
                        return <></>;
                    }
                })}
            </Stack>
        </MainContentBox>
    );
}

export default SupportEffects;
