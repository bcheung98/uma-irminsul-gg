// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectUnreleasedContent } from "reducers/settings";
import { isUnreleasedContent } from "helpers/utils";

// Type imports
import { Version } from "types/version";

function BetaTag(props: { version: Version }) {
    const theme = useTheme();

    const showJP = useAppSelector(selectUnreleasedContent);

    if (!showJP && !isUnreleasedContent(props.version)) {
        return (
            <Card sx={{ p: 2, backgroundColor: theme.palette.error.dark }}>
                <TextStyled>This content is only available on the JP server!</TextStyled>
            </Card>
        );
    } else {
        return null;
    }
}

export default BetaTag;
