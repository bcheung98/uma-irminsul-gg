import { useState } from "react";

// Component imports
import RenameDeck from "./RenameDeck";
import CopyDeck from "./CopyDeck";
import ResetDeck from "./ResetDeck";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Button, ButtonProps, Dialog } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
// import SaveAltIcon from "@mui/icons-material/SaveAlt";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCurrentDeck, selectCurrentDeckIndex } from "reducers/planner";

function DeckActions() {
    const theme = useTheme();

    const currentDeck = useAppSelector(selectCurrentDeck);
    const index = useAppSelector(selectCurrentDeckIndex);

    const [renameDeckOpen, setRenameDeckOpen] = useState(false);
    const handleRenameDeckOpen = () => {
        setRenameDeckOpen(true);
    };
    const handleRenameDeckClose = () => {
        setRenameDeckOpen(false);
    };

    const [copyDeckOpen, setCopyDeckOpen] = useState(false);
    const handleCopyDeckOpen = () => {
        setCopyDeckOpen(true);
    };
    const handleCopyDeckClose = () => {
        setCopyDeckOpen(false);
    };

    const [resetDeckOpen, setResetDeckOpen] = useState(false);
    const handleResetDeckOpen = () => {
        setResetDeckOpen(true);
    };
    const handleResetDeckClose = () => {
        setResetDeckOpen(false);
    };

    const buttonParams: ButtonProps = {
        variant: "contained",
        color: "info",
        disableElevation: true,
        disableRipple: true,
        sx: {
            height: "32px",
            "&.Mui-disabled": {
                backgroundColor: theme.palette.info.main,
                color: theme.text.primary,
                opacity: 0.5,
            },
        },
    };

    const isDeckEmpty =
        currentDeck.character === null &&
        currentDeck.supports.slice(0, 6).every((i) => i === null);

    return (
        <>
            <FlexBox
                sx={{
                    flexWrap: "wrap",
                    rowGap: "8px",
                    columnGap: "16px",
                    mt: "16px",
                }}
            >
                <Button
                    onClick={handleRenameDeckOpen}
                    startIcon={<DriveFileRenameOutlineIcon />}
                    {...buttonParams}
                >
                    Rename
                </Button>
                <Button
                    onClick={handleCopyDeckOpen}
                    startIcon={<ContentCopyIcon />}
                    disabled={isDeckEmpty}
                    {...buttonParams}
                >
                    Copy
                </Button>
                <Button
                    onClick={handleResetDeckOpen}
                    startIcon={<RestartAltIcon />}
                    disabled={isDeckEmpty}
                    {...buttonParams}
                >
                    Reset
                </Button>
            </FlexBox>
            <Dialog
                open={renameDeckOpen}
                onClose={handleRenameDeckClose}
                maxWidth="xs"
                fullWidth
                disableScrollLock
            >
                <RenameDeck
                    name={currentDeck.name}
                    handleClose={handleRenameDeckClose}
                />
            </Dialog>
            <Dialog
                open={copyDeckOpen}
                onClose={handleCopyDeckClose}
                maxWidth="md"
                disableScrollLock
            >
                <CopyDeck index={index} handleClose={handleCopyDeckClose} />
            </Dialog>
            <Dialog
                open={resetDeckOpen}
                onClose={handleResetDeckClose}
                maxWidth="xs"
                fullWidth
                disableScrollLock
            >
                <ResetDeck index={index} handleClose={handleResetDeckClose} />
            </Dialog>
        </>
    );
}

export default DeckActions;
