// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Helper imports
import { toTitleCase } from "helpers/utils";

// Type imports
import { CharacterProps } from "types/character";

function CharacterAptitude({ character }: CharacterProps) {
    const theme = useTheme();

    const { aptitude } = character;

    return (
        <MainContentBox title="Aptitude" contentProps={{ padding: 2 }}>
            <FlexBox flexWrap="wrap" columnGap="24px" rowGap="16px">
                {Object.entries(aptitude).map(([category, values]) => (
                    <Box
                        key={category}
                        sx={{
                            px: 2,
                            py: 1,
                            backgroundColor: theme.background(1, "light"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                            width: "100%",
                        }}
                    >
                        <TextStyled variant="h6-styled" sx={{ mb: "4px" }}>
                            {toTitleCase(category)}
                        </TextStyled>
                        <FlexBox flexWrap="wrap" columnGap="24px" rowGap="4px">
                            {Object.entries(values).map(([apt, rank]) => (
                                <FlexBox
                                    key={apt}
                                    gap="8px"
                                    alignItems="center"
                                >
                                    <TextStyled>{toTitleCase(apt)}:</TextStyled>
                                    <Image
                                        src={`ranks/${rank}`}
                                        style={{ width: "28px" }}
                                    />
                                </FlexBox>
                            ))}
                        </FlexBox>
                    </Box>
                ))}
            </FlexBox>
        </MainContentBox>
    );
}

export default CharacterAptitude;
