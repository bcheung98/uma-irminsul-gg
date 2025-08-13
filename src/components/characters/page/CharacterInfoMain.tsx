// Component imports
import RarityStars from "custom/RarityStars";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Card, Divider, Stack } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { name, title, rarity } = character;

    return (
        <Card
            sx={{
                p: "16px 24px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "24px", rowGap: "8px" }}
                >
                    <Box>
                        <Box sx={{ mb: "8px" }}>
                            <TextStyled
                                variant="h6-styled"
                                sx={{ mb: "4px", fontStyle: "italic" }}
                            >
                                {title}
                            </TextStyled>
                        </Box>
                        <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                            <TextStyled variant="h4-styled">{name}</TextStyled>
                            <FlexBox>
                                <TextStyled variant="h5-styled">(</TextStyled>
                                <RarityStars
                                    rarity={rarity}
                                    variant="h5-styled"
                                />
                                <TextStyled variant="h5-styled">)</TextStyled>
                            </FlexBox>
                        </FlexBox>
                    </Box>
                </FlexBox>
            </Stack>
        </Card>
    );
}

export default CharacterInfoMain;
