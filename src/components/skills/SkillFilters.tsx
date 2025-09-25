import { BaseSyntheticEvent } from "react";

// Component imports
import BrowserSort from "custom/BrowserSort";
import Dropdown from "custom/Dropdown";
import ToggleButtons from "custom/ToggleButtons";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    List,
    IconButton,
    Toolbar,
    Button,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    activeSkillFilters,
    clearFilters,
    selectSkillFilters,
    setConditions,
    setRarity,
} from "reducers/skillFilters";

// Type imports
import { SkillRarity } from "types/_common";

function SkillFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectSkillFilters);
    const dispatch = useAppDispatch();

    const skillRarities = ["Normal", "Rare", "Unique", "_", "_", "Evolved"];
    const rarities: SkillRarity[] = [6, 3, 2, 1];

    const conditionButtons = {
        None: ["No condition"],
        Track: ["Turf", "Dirt"],
        Distance: ["Sprint", "Mile", "Medium", "Long"],
        Style: ["Front", "Pace", "Late", "End"],
        Stage: [
            "Early-Race",
            "Mid-Race",
            "Late-Race",
            "Last-Spurt",
            "Corner",
            "Straight",
            "Final Corner",
            "Final Straight",
            "Slope",
        ],
    };

    const filterGroups = [
        {
            name: "Conditions",
            value: filters.conditions,
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                dispatch(setConditions(newValues)),
            buttons: createGroupedButtons(conditionButtons, null, null),
            grouped: true,
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: SkillRarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.map((rarity) => ({
                value: rarity,
                label: (
                    <TextStyled
                        key={rarity}
                        component="span"
                        variant="body2-styled"
                        sx={{ color: theme.appbar.color }}
                    >
                        {skillRarities[rarity - 1]}
                    </TextStyled>
                ),
            })),
            width: "192px",
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeSkillFilters)}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    startIcon={<RestartAltIcon />}
                    sx={{
                        height: "32px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.appbar.color,
                        },
                        border: `1px solid ${theme.border.color.primary}`,
                    }}
                >
                    Reset
                </Button>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "16px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.appbar.color
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        {filter.grouped !== undefined ? (
                            <Stack spacing={1}>
                                {filter.buttons.map((group, index) => (
                                    <ToggleButtons
                                        key={index}
                                        color="secondary"
                                        buttons={group.buttons}
                                        value={filter.value}
                                        onChange={filter.onChange}
                                        spacing={4}
                                        padding={
                                            "label" in group.buttons[0]
                                                ? "0 8px"
                                                : 0
                                        }
                                    />
                                ))}
                            </Stack>
                        ) : (
                            <ToggleButtons
                                color="secondary"
                                buttons={filter.buttons}
                                value={filter.value}
                                onChange={filter.onChange}
                                spacing={4}
                                padding={
                                    "label" in filter.buttons[0] ? "0 8px" : 0
                                }
                            />
                        )}
                    </Dropdown>
                ))}
            </List>
            <BrowserSort type="skills" options={["name", "rarity", "type"]} />
        </>
    );
}

export default SkillFilters;

function createButtons<T extends string>(
    items: readonly T[],
    url: string | null
) {
    return items.map((item) => ({
        value: item,
        label: item,
        icon: url && (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
            />
        ),
    }));
}

function createGroupedButtons<
    T extends { readonly [key: string]: readonly string[] }
>(items: T, groupUrl: string | null, url: string | null) {
    return Object.entries(items).map(([key, values]) => ({
        icon: groupUrl && `${groupUrl}/${key}`,
        title: key,
        buttons: createButtons(values, url),
    }));
}
