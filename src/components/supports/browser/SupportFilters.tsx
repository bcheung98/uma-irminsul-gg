import { BaseSyntheticEvent } from "react";

// Component imports
import BrowserSort from "custom/BrowserSort";
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    activeSupportFilters,
    clearFilters,
    selectSupportFilters,
    setRarity,
    setSpecialty,
} from "reducers/supportFilters";
import { rarities, specialties } from "data/common";

// Type imports
import { Rarity, Specialty } from "types/_common";

function SupportFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectSupportFilters);
    const dispatch = useAppDispatch();

    const ranks = ["R", "SR", "SSR"];

    const filterGroups = [
        {
            name: "Specialty",
            value: filters.specialty,
            onChange: (_: BaseSyntheticEvent, newValues: Specialty[]) =>
                dispatch(setSpecialty(newValues)),
            buttons: createButtons(specialties, "stat_icons"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.slice(0, -2).map((rarity) => ({
                value: rarity,
                icon: (
                    <Image
                        src={`rarity/${ranks[rarity - 3]}`}
                        alt={`${ranks[rarity - 3]}`}
                        style={{ height: "32px", padding: "4px" }}
                        tooltip={`${ranks[rarity - 3]}`}
                    />
                ),
            })),
            width: "128px",
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeSupportFilters)}
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
                        (
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            width={filter.width || undefined}
                            spacing={4}
                            padding={"label" in filter.buttons[0] ? "0 8px" : 0}
                        />
                        )
                    </Dropdown>
                ))}
            </List>
            <BrowserSort
                type="supports"
                options={["release", "name", "rarity"]}
            />
        </>
    );
}

export default SupportFilters;

function createButtons<T extends string>(items: readonly T[], url: string) {
    const padding = url.startsWith("ranks/") ? "0px" : "2px";
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: padding, borderRadius: "0px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T extends string>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("ranks")) {
        tooltip = "";
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
