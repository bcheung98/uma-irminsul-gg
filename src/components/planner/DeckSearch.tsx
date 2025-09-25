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
import { sortBy, toTitleCase } from "helpers/utils";
import {
    useAppDispatch,
    useAppSelector,
    selectAppCharacters,
    selectAppSupports,
} from "helpers/hooks";
import { addCharacter, addScenario, addSupport } from "reducers/planner";
import { selectCurrentDeck } from "reducers/planner";
import { scenarios } from "data/scenarios";

// Type imports
import { CardType, Deck } from "types/planner";
import { Character } from "types/character";
import { Support } from "types/support";
import { Scenario } from "types/scenario";

function DeckSearch({
    deck,
    type,
    index = 0,
    handleClose,
}: {
    deck: Deck;
    type?: CardType;
    index?: number;
    handleClose: () => void;
}) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectAppCharacters)];
    const supports = [...useAppSelector(selectAppSupports)];

    const currentDeck = useAppSelector(selectCurrentDeck);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    let data: Character[] | Support[] | Scenario[];

    if (type === "character") {
        data = characters
            .filter((char) => char.id !== deck.character)
            .filter((char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .sort((a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.id, a.id));
    } else if (type === "support") {
        data = supports
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
    } else {
        data = scenarios.filter((s) => s.global);
    }

    const itemTag = (item: Character | Support | Scenario) => {
        let res = "";
        if ("skills" in item) {
            res += `(${item.outfit || "Original"})`;
        }
        if ("specialty" in item) {
            const ranks = ["R", "SR", "SSR"];
            res += `(${ranks[item.rarity - 3]} ${item.specialty})`;
        }
        return res;
    };

    const imgURL = (type?: CardType) => {
        let url = "";
        if (type === "character") {
            url = "characters/avatars";
        } else if (type === "support") {
            url = "supports/icons";
        } else if (type === "scenario") {
            url = "scenarios";
        } else {
        }
        return url;
    };

    const handleClick = (
        item: Character | Support | Scenario | null,
        type?: CardType
    ) => {
        if (type === "character") {
            if (item) {
                dispatch(addCharacter(item.id));
            } else {
                dispatch(addCharacter(null));
            }
        } else if (type === "support") {
            if (item) {
                dispatch(addSupport({ index: index, id: item.id }));
            } else {
                dispatch(addSupport({ index: index, id: null }));
            }
        } else if (type === "scenario") {
            if (item) {
                dispatch(addScenario(item.id));
            } else {
                dispatch(addScenario(null));
            }
        } else {
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
        <Stack {...stackParams} onClick={() => handleClick(null, type)}>
            <HighlightOffIcon
                sx={{
                    width: "48px",
                    height: "48px",
                    p: "8px",
                    color: theme.text.primary,
                }}
            />
            <TextStyled>{`Remove ${toTitleCase(type || "")}`}</TextStyled>
        </Stack>
    );

    return (
        <MainContentBox
            title={`Select a ${toTitleCase(type || "")}`}
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
            {type !== "scenario" && (
                <Box sx={{ mb: "16px" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Box>
            )}
            <Box
                sx={{
                    pb: 2,
                    maxHeight: "600px",
                    overflowY: "auto",
                    scrollbarWidth: matches_sm_up ? "none" : "thin",
                }}
            >
                <Stack spacing={1}>
                    {type === "character" &&
                        currentDeck.character !== null &&
                        deleteOption}
                    {type === "support" &&
                        currentDeck.supports[index] !== null &&
                        deleteOption}
                    {data.map((item) => (
                        <Stack
                            key={item.id}
                            {...stackParams}
                            onClick={() => handleClick(item, type)}
                        >
                            <Image
                                src={`${imgURL(type)}/${item.id}`}
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

export default DeckSearch;

enum Specialty {
    "Speed",
    "Stamina",
    "Power",
    "Guts",
    "Wit",
    "Pal",
    "Group",
}
