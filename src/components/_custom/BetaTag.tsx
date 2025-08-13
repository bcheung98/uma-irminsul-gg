// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card } from "@mui/material";

// Helper imports
import { isUnreleasedContent } from "helpers/utils";

// Type imports
import { Version } from "types/version";

function BetaTag(props: { version: Version }) {
    const theme = useTheme();

    if (!isUnreleasedContent(props.version)) {
        return (
            <Card sx={{ p: 2, backgroundColor: theme.palette.error.dark }}>
                <TextStyled>JP version only!</TextStyled>
            </Card>
        );
    } else {
        return null;
    }
}

export default BetaTag;
