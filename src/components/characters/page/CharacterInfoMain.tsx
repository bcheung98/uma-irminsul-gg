// Component imports
import CharacterImage from "./CharacterImage";
import CharacterStats from "./CharacterStats";
import CharacterAptitude from "./CharacterAptitude";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { name, title, rarity } = character;

    return (
        <MainContentBox
            title={
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ p: { xs: "8px 8px 0px 0px", sm: "16px" } }}
                >
                    {!matches_sm_up && (
                        <Box sx={{ width: "128px", height: "128px" }}>
                            <CharacterImage character={character} />
                        </Box>
                    )}
                    <Box>
                        <TextStyled
                            variant={
                                matches_sm_up ? "h6-styled" : "body1-styled"
                            }
                            sx={{ color: theme.appbar.color }}
                        >
                            {`[${title}]`}
                        </TextStyled>
                        <TextStyled
                            variant={matches_sm_up ? "h4-styled" : "h6-styled"}
                            sx={{ color: theme.appbar.color }}
                        >
                            {name}
                        </TextStyled>
                        <Image
                            src={`rarity/stars/${rarity}`}
                            alt={`${rarity}`}
                            style={{ marginLeft: "-4px" }}
                        />
                    </Box>
                </Stack>
            }
            headerProps={{ padding: "0px" }}
            contentProps={{ padding: "16px 0px" }}
        >
            <Stack spacing={{ xs: 1, sm: 2 }}>
                <CharacterStats character={character} />
                <CharacterAptitude character={character} />
            </Stack>
        </MainContentBox>
    );
}

export default CharacterInfoMain;
