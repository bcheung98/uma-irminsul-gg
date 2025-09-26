import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import BannerListRow from "./BannerListRow";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";
import { StyledMenuItem } from "styled/StyledMenu";
import { StyledSwitch } from "styled/StyledSwitch";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import {
    useTheme,
    Autocomplete,
    IconButton,
    Stack,
    Divider,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectSupports } from "reducers/support";
import { selectCharacterBanners, selectSupportBanners } from "reducers/banner";
import { selectUnreleasedContent } from "reducers/settings";
import { createBannerData } from "helpers/createBannerData";
import { sortBy } from "helpers/utils";

// Type imports
import { Banner, BannerData, BannerOption, BannerType } from "types/banner";

function BannerList({ type }: { type: BannerType }) {
    const theme = useTheme();

    const ranks = ["R", "SR", "SSR"];

    const banners =
        type === "character"
            ? useAppSelector(selectCharacterBanners)
            : useAppSelector(selectSupportBanners);

    const characters = useAppSelector(selectCharacters);
    const supports = useAppSelector(selectSupports);

    const showUnreleased = useAppSelector(selectUnreleasedContent);

    const ids = [...characters, ...supports].map((item) => item.id);

    const [rows, setRows] = useState<BannerData[]>([]);

    const [values, setValue] = useState<BannerOption[]>([]);
    const options = createOptions(banners);

    const [selected, setSelected] = useState(true);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const handleDirectionChange = (
        _: BaseSyntheticEvent,
        newDirection: "asc" | "desc"
    ) => {
        if (newDirection !== null) {
            setSortDirection(newDirection);
        }
    };

    useEffect(() => {}, [characters, supports]);

    useEffect(() => {
        setRows(createBannerRows(banners, values));
    }, [banners, values, selected, sortDirection]);

    function createBannerRows(banners: Banner[], searchValue: BannerOption[]) {
        let rowData: BannerData[] = [];
        banners.forEach((banner) => {
            const rateUps = banner.rateUps.map((id) =>
                createBannerData(id, type, characters, supports)
            );
            rowData.push({ ...banner, rateUps: rateUps });
        });
        if (!showUnreleased) {
            rowData = rowData.filter((banner) => banner.start !== "");
        }
        if (searchValue.length > 0) {
            rowData = rowData.filter((banner) => {
                function filterFn(item: BannerOption) {
                    return [
                        ...banner.rateUps.map((item) => item.title),
                    ].includes(item.title);
                }
                if (selected) {
                    return searchValue.every(filterFn);
                } else {
                    return searchValue.some(filterFn);
                }
            });
        }
        if (sortDirection === "asc") {
            rowData = rowData.reverse();
        }
        return rowData;
    }

    function createOptions(banners: Banner[]) {
        if (!showUnreleased) {
            banners = banners.filter((banner) => banner.start !== "");
        }
        let options = [
            ...new Set(banners.map((banner) => banner.rateUps).flat()),
        ]
            .map((id) => createBannerData(id, type, characters, supports))
            .sort((a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.id, a.id));
        return options;
    }

    const optionName = (option: BannerOption) => {
        return type === "character"
            ? `${option.name} (${option.outfit || "Original"})`
            : `${option.name} (${ranks[option.rarity - 3]} ${
                  option.specialty
              })`;
    };

    return (
        <>
            <Autocomplete
                multiple
                autoComplete
                filterSelectedOptions
                options={options}
                getOptionLabel={(option) => optionName(option)}
                filterOptions={(options, { inputValue }) =>
                    options.filter(
                        (option) =>
                            option.name
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase()) ||
                            option.title
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase())
                    )
                }
                noOptionsText={
                    type === "character" ? "No Characters" : "No Support Cards"
                }
                value={values}
                isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                }
                onChange={(_: any, newValue: BannerOption[] | null) =>
                    setValue(newValue as BannerOption[])
                }
                renderInput={(params) => (
                    <SearchBar
                        params={params}
                        placeholder={
                            type === "character"
                                ? "Characters"
                                : "Support Cards"
                        }
                        inputIcon={
                            type === "character" ? (
                                <Image
                                    src="icons/Horse"
                                    alt="Characters"
                                    style={{
                                        width: "32px",
                                        marginLeft: "4px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor,
                                        borderRadius: "4px",
                                    }}
                                />
                            ) : (
                                <Image
                                    src="icons/Card"
                                    alt="Support Cards"
                                    style={{
                                        width: "32px",
                                        marginLeft: "4px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor,
                                        borderRadius: "4px",
                                    }}
                                />
                            )
                        }
                    />
                )}
                renderOption={(props, option) => (
                    <StyledMenuItem
                        {...props}
                        key={option.id}
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.menu.hover,
                            },
                            "&:not(:last-child)": {
                                borderBottom: `1px solid ${theme.border.color.primary}`,
                            },
                        }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <Image
                                    src={
                                        type === "character"
                                            ? `characters/icons/${option.id}`
                                            : `supports/icons/${option.id}`
                                    }
                                    alt={option.name}
                                    style={{
                                        width: "48px",
                                        height: "auto",
                                    }}
                                />
                                <TextStyled noWrap>
                                    {optionName(option)}
                                </TextStyled>
                            </Stack>
                        </Stack>
                    </StyledMenuItem>
                )}
            />
            <FlexBox sx={{ my: "8px", height: "30px" }}>
                <StyledSwitch
                    checked={selected}
                    onChange={handleSelect}
                    sx={{ mt: "3px" }}
                />
                <TextStyled variant="body2-styled">
                    Toggle "AND" Filter
                </TextStyled>
                <StyledTooltip
                    title="If toggled, will filter banners that only contain all selected items."
                    arrow
                    placement="top"
                >
                    <IconButton disableRipple>
                        <HelpIcon />
                    </IconButton>
                </StyledTooltip>
            </FlexBox>
            <MainContentBox
                title={
                    <FlexBox
                        sx={{
                            width: "100%",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextStyled sx={{ color: theme.appbar.color }}>
                            {`${
                                type === "character"
                                    ? "Character"
                                    : "Support Card"
                            }
                            Banner`}
                        </TextStyled>
                        <ToggleButtons
                            color="primary"
                            buttons={[
                                {
                                    value: "asc",
                                    icon: <ArrowUpwardIcon fontSize="small" />,
                                },
                                {
                                    value: "desc",
                                    icon: (
                                        <ArrowDownwardIcon fontSize="small" />
                                    ),
                                },
                            ]}
                            value={sortDirection}
                            exclusive
                            onChange={handleDirectionChange}
                            highlightOnHover={false}
                        />
                    </FlexBox>
                }
                contentProps={{ padding: 0 }}
            >
                <Stack divider={<Divider />}>
                    {rows.map((row) => (
                        <BannerListRow
                            key={row.id}
                            loading={ids.length === 0}
                            type={type}
                            row={row}
                        />
                    ))}
                </Stack>
            </MainContentBox>
        </>
    );
}

export default BannerList;
