import { BaseSyntheticEvent, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Box,
    Stack,
    StackProps,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Helper imports
import { sortBy } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { addSupport } from "reducers/planner";
import { selectSupports } from "reducers/support";

// Type imports
import { Deck } from "types/planner";
import { Support } from "types/support";

function EventSearch({
    deck,
    handleClose,
}: {
    deck: Deck;
    handleClose: () => void;
}) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const dispatch = useAppDispatch();

    const supports = [...useAppSelector(selectSupports)];

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    let data: Support[] = supports
        .filter((supp) => !deck.supports.includes(supp.id))
        .filter((supp) =>
            supp.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort(
            (a, b) =>
                sortBy(a.rarity, b.rarity) ||
                sortBy(Specialty[b.specialty], Specialty[a.specialty]) ||
                sortBy(b.id, a.id)
        );

    const itemTag = (item: Support) => {
        const ranks = ["R", "SR", "SSR"];
        return `(${ranks[item.rarity - 3]} ${item.specialty})`;
    };

    const handleClick = (item: Support | null) => {
        if (item) {
            dispatch(addSupport({ index: 6, id: item.id }));
        } else {
            dispatch(addSupport({ index: 6, id: -1 }));
        }
        handleClose();
    };

    const stackParams: StackProps = {
        spacing: 1,
        direction: "row",
        alignItems: "center",
        sx: {
            p: 1,
            borderRadius: "4px",
            backgroundColor: theme.background(0, "dark"),
            "&:hover": {
                backgroundColor: theme.background(0, "light"),
                cursor: "pointer",
            },
        },
    };

    const deleteOption = (
        <Stack {...stackParams} onClick={() => handleClick(null)}>
            <HighlightOffIcon
                sx={{
                    width: "48px",
                    height: "48px",
                    p: "8px",
                    color: theme.text.primary,
                }}
            />
            <TextStyled>{`Remove support`}</TextStyled>
        </Stack>
    );

    return (
        <MainContentBox
            title={`Select a support`}
            actions={
                <IconButton
                    disableRipple
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            }
        >
            <Box sx={{ mb: "16px" }}>
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    size={{ height: "36px" }}
                />
            </Box>
            <Box
                sx={{
                    pb: 2,
                    maxHeight: "600px",
                    overflowY: "auto",
                    scrollbarWidth: matches_sm_up ? "none" : "thin",
                }}
            >
                <Stack spacing={1}>
                    {deck.supports[6] !== -1 && deleteOption}
                    {data.map((item) => (
                        <Stack
                            key={item.id}
                            {...stackParams}
                            onClick={() => handleClick(item)}
                        >
                            <Image
                                src={`supports/icons/${item.id}`}
                                alt={`${item.id}`}
                                style={{ width: "48px", height: "100%" }}
                            />
                            <Box>
                                <TextStyled>{item.name}</TextStyled>
                                <TextStyled variant="body2-styled">
                                    {itemTag(item)}
                                </TextStyled>
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </MainContentBox>
    );
}

export default EventSearch;

enum Specialty {
    "Speed",
    "Stamina",
    "Power",
    "Guts",
    "Wit",
    "Pal",
    "Group",
}
