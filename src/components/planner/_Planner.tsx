// Component imports
import DeckBuilder from "./DeckBuilder";
import EventViewer from "./EventViewer";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Stack } from "@mui/material";

function Planner() {
    const documentTitle = `Training Event Planner ${
        import.meta.env.VITE_DOCUMENT_TITLE
    }`;
    const documentDesc = `Tool for viewing Training Events`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    return (
        <>
            <TextStyled
                variant="h5-styled"
                sx={{ mb: "20px", lineHeight: "36px" }}
            >
                Training Event Helper (WIP)
            </TextStyled>
            <Stack spacing={4}>
                <DeckBuilder />
                <EventViewer />
            </Stack>
        </>
    );
}

export default Planner;
