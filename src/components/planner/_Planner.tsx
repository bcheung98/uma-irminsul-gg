// Component imports
import DeckBuilder from "./DeckBuilder";
import { TextStyled } from "styled/StyledTypography";

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
                Training Event Helper
            </TextStyled>
            <DeckBuilder />
        </>
    );
}

export default Planner;
